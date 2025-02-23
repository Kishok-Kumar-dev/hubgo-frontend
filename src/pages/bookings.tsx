import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, InputNumber,Typography, Layout, message, notification, Radio, Row, Select, Space, Table, AutoComplete, Spin, Modal } from 'antd';
import { Box, Calculator, Package, Plus, ShoppingCart } from 'lucide-react';
import React, { useRef, useState, useEffect, useContext } from 'react';
import type { GetRef, InputRef, TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getData, postData } from '../service/AppService';
import { AutoCompleteProps } from "antd/es/auto-complete";
import { Client } from '@googlemaps/google-maps-services-js';
import { OlaMapsSDK } from "ola-maps-node-sdk";

const { Option } = Select;
const { Content } = Layout;
const { Text, Title } = Typography;
 interface PricingSettings {
    discountIncrement: number;
    maxDiscount: number;
    distanceRates: {
      freeKm: number;
      firstTier: {
        uptoKm: number;
        price: number;
      };
      secondTier: {
        uptoKm: number;
        price: number;
      };
      thirdTier: {
        uptoKm: number;
        price: number;
      };
      beyondPrice: number;
    };
  }

  const VOLUMETRIC_DIVISOR = 5000;
const getPackageSizePriority = (size: string | undefined): number => {
    switch (size) {
      case 'L':
        return 4;
      case 'M':
        return 3;
      case 'S':
        return 2;
      case 'XS':
        return 1;
      default:
        return 0;
    }
  };
export interface CartItem {
    cartItrr: number|null;
    waybillNo: string;
    pincode: string;
    packageType: string;
    productSize: string;
    packageContent: string;
    productQuantity: number;
    productValue: number;
    transportCharges: number;
    hubgoCharges: number|null;
    basePrice:number;
    discount:number;
}
interface DataType {
    cartItrr: React.Key;
    waybillNo: string;
    pincode: string;
    packageType: string;
    productSize: string;
    packageContent: string;
    productQuantity: number;
    productValue: number;
    transportCharges: number;
    hubgoCharges: number|null;
    basePrice:number;
    discount:number;
}

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);
interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [tform] = Form.useForm();

    return (
        <Form form={tform} component={false}>
            <EditableContext.Provider value={tform}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    dataIndex: keyof CartItem;
    record: CartItem;
    handleSave: (record: CartItem) => void;
}
const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[{ required: true, message: `${title} is required.` }]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingInlineEnd: 24 }}
                onClick={toggleEdit}
            >
                <Input value={children?.toString().replace(",", "")} />
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};
type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;

const OLAOptions = {
    clientId: "58cc9752-8409-4a2f-8cda-c6a6974fcc03",
    clientSecret: "a8V6Ha3lRQsrPiTB92j6N8wXYwUWvLWc"
}



const Bookings = () => {
    const [isPriceSettingLoaded, setIsPriceSettingLoaded]=useState(false);
    const [form] = Form.useForm();
    const [cartItems, setCartItems]= useState<any>([]);
    const [spin, setSpin] = useState<any>(false);
    const [cform] = Form.useForm();
    const [tableForm] = Form.useForm();
    const [items, setItems] = useState<CartItem[]>([]);
    const [waybillNo, setWaybillNo] = useState<any>(null);
    const [cartItr, setCartItr] = useState(0);
    const [senderName, setSenderName] = useState<any>(null);
    const [senderMobileNo, setSenderMobileNo] = useState<any>(null);
    const [receiverName, setReceiverName] = useState<any>(null);
    const [receiverMobileNo, setReceiverMobileNo] = useState<any>(null);
    const [senderHubCoordinates, setSenderHubCoordinates] = useState<any>(null);
    const [receiverCoordinates, setReceiverCoordinates] = useState<any>();
    const [address, setAddress] = useState<any>(null);
    const [bookedByTA, setBookedByTA] = useState<any>(1);
    const [distance, setDistance] = useState<number>(0);
    const [subtotal, setSubTotal]= useState<number>(0);
    const [freeKm, setFreeKm]= useState(0);
    const [firstTier, setFirstTier]= useState(0);
    const [secondTier, setSecondTier]= useState(0);
    const [thirdTier, setThirdTier]= useState(0);
    const [beyondPrice, setBeyondPrice]= useState(0);
    const [pincode, setPincode] = useState<any>(null);
    const [paymentMethod, setPaymentMethod] = useState<any>("PREPAID");
    const [transportShippingCharges, setTransportShippingCharges] = useState<any>("0");
    const [hubgoDeliveryCharges, setHubgoDeliveryCharges] = useState<any>("0");
    const [packageOptions, setPackageOptions] = useState([{ label: "Envelope / Pouch", value: "envelope" }, { label: "Box / Carton", value: "box" }, { label: "Suitcases / Handbags", value: "suitcase" }]);
    const [packageName, setPackageName] = useState<any>("");
    const [packageContentOptions, setPackageContentOptions] = useState([{ label: "Books and Documents", value: "documents" }, { label: "Electronics", value: "electronics" }, { label: "Clothes / Personal Items", value: "clothes" }, { label: "HouseHold", value: "household" }, { label: "Consumables", value: "consumables" }]);
    const [packageContent, setPackageContent] = useState<any>("");
    const [customDimensions, setCustomDimensions] = useState({
        length: 0,
        breadth: 0,
        height: 0,
    });
    const [unit, setUnit] = useState('cm');
    const [weight, setWeight] = useState(0);
    const navigate = useNavigate();
    const [totalQty, setTotalQty] = useState(0);
    const [totalProductValue, setTotalProductValue] = useState(0);
    const [totalTransportCharges, setTotalTransportCharges] = useState(0);
    const [totalDistanceCharges,setTotalDistanceCharges]=useState(0);
    const [totalhubGoCharges, setTotalhubGoCharges] = useState(0);
    const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
    const [totalkms, setTotalKms] = useState<any>(0);
    useEffect(()=>{
        console.log(distance);
    },[distance]);

    const [settings, setSettings] = useState<any>({});
    
      const calculateDistanceCharge = (km: number): number => {
        if(isPriceSettingLoaded){
            const { freeKm, firstTier, secondTier, thirdTier, beyondPrice } =
            settings.distanceRates;
      
          if (km <= freeKm) return 0;
          if (km <= firstTier.uptoKm) return firstTier.price;
          if (km <= secondTier.uptoKm) return secondTier.price;
          if (km <= thirdTier.uptoKm) return thirdTier.price;
          return thirdTier.price + (km - thirdTier.uptoKm) * beyondPrice;
        }
       
      };
      const getCustomPackageBasePrice = (weight: number): number => {
        if (weight <= 2) return 49;
        if (weight <= 5) return 60;
        if (weight <= 10) return 150;
        if (weight <= 20) return 200;
        return 200 + (weight - 20) * settings.OVERWEIGHT_PER_KG;
      };
      const getFixedPackageBasePrice = (size:any): number => {
        return settings.packagePrices[size]?settings.packagePrices[size]:0;

      };
    
      const calculateVolumetricWeight = (
        length: number,
        width: number,
        height: number
      ): number => {
        return (length * width * height) / VOLUMETRIC_DIVISOR;
      };
      const loadGoogleMapsScript = (apiKey: string) => {
        if (!window.google) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
            script.async = true;
            script.onload = () => console.log("Google Maps script loaded");
            document.head.appendChild(script);
        }
    };
    const handleAddressSearch = async (value: string) => {
        if (!value) return;
        // if(pincode ){
        //     value=  `${value} ,${pincode}`

        // }

        // Fetch suggestions from Google Places API
        const autocompleteService = new google.maps.places.AutocompleteService();
        autocompleteService.getPlacePredictions(
            { input: value },
            (predictions, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
                    setOptions(
                        predictions.map((prediction) => ({
                            value: prediction.description,
                            label: (
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <span>{prediction.description}</span>
                                </div>
                            ),
                        }))
                    );
                } else {
                    if (status == 'ZERO_RESULTS') {
                        setAddress(value);
                    }
                }
            }
        );

    };


    const handleAddressSelect = async (value: string) => {
        console.log("Selected place:", value);

        if (window.google) {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: value }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
                    const lat = results[0].geometry.location.lat();
                    const lng = results[0].geometry.location.lng();
                    if (senderHubCoordinates != null && lat && lng) {
                       calculateRouteDistance({ lat: senderHubCoordinates.toString().split(",")[0], lng: senderHubCoordinates.toString().split(",")[1] }, { lat, lng });
                    }
                } else {
                    console.error("Geocode was not successful for the following reason: " + status);
                }
            });
        }
    };

    const calculateRouteDistance = async (origin: { lat: number; lng: number }, destination: { lat: number; lng: number }) => {
        try {


            const ola_map = new OlaMapsSDK(OLAOptions);
            ola_map.Routing.directions({
                lat: origin.lat,
                long: origin.lng
            }, {
                lat: destination.lat,
                long: destination.lng
            }).then(response => {
                let kms = 0;
                if (response && response.routes && response.routes.length > 0 && response.routes[0].legs[0].distance) {
                    let dist = response.routes[0].legs[0].distance;
                    kms = parseInt(dist) / 1000;
                    setDistance(kms);
                }
                setDistance(kms);
                return kms;
            }).catch(err => console.log(err))
        } catch (error: any) {
            console.error("Error calculating route distance with Ola Maps:", error);
            message.error(error?.message || "Failed to calculate route distance. Please try again.");
        }
        return null;
    };


    useEffect(() => {

    }, [items])

    const [predefinedOptions, setPredefinedOptions] = useState([
        { label: 'Extra Small  Less than 2 kg ', value: 'XS' },
        { label: 'Small  2Kg to 5 kg', value: 'S' },
        { label: 'Medium 5.01 kg to 12 kg', value: 'M' },
        { label: 'Large  12.01 kg to 20 kg', value: 'L' },
    ]);
    const handleCustomInput = (field: any, value: any) => {
        setCustomDimensions((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    const addCustomPackage = () => {
        const { length, breadth, height } = customDimensions;

        // Validation
        if (!length || !breadth || !height || !weight) {
            message.warning('Please fill in all dimensions and weight before adding.');
            return;
        }

        // Create custom label
        const label = `Other (${length}x${breadth}x${height}, ${unit}) (${weight}, Kg)`;

        // Prevent duplicate entries
        const exists = predefinedOptions.some((option) => option.label === label);
        if (exists) {
            message.warning('This package size already exists.');
            return;
        }

        // Add the custom package option
        setPredefinedOptions((prevOptions) => [
            ...prevOptions,
            { label, value: label },
        ]);
        form.setFieldsValue({ "productSize": label })
        // Clear custom inputs
        // setCustomDimensions({ length: '', breadth: '', height: '' });
        // setWeight('');
        message.success('Custom package added successfully!');
    };


    useEffect(() => {
        setSpin(true);
        getData('/api/config-json/pricesettings').then((priceset: any) => {
            let pricesetjson: any = JSON.parse(priceset.jsonData);
            setSettings(pricesetjson);
            if (pricesetjson.distanceRates) {
                setFreeKm(pricesetjson.distanceRates.freeKm);
                setFirstTier(pricesetjson.distanceRates.firstTier);
                setSecondTier(pricesetjson.distanceRates.secondTier);
                setThirdTier(pricesetjson.distanceRates.thirdTier);
                setBeyondPrice(pricesetjson.distanceRates.beyondPrice);
            }
            setIsPriceSettingLoaded(true);
            const res = localStorage.getItem('user');
            let userJson = JSON.parse(res || '{}');
            console.log(userJson);
            if (userJson.userid) {
                setBookedByTA(userJson.userid);
            }
            setSenderHubCoordinates(userJson.userCoordinates);
            if (userJson.roles != 'ADMIN' && userJson.roles != 'TRANSPORT' && userJson.roles != 'BOOKING_AGENT') {
                navigate('/', { replace: true });
            }
            loadGoogleMapsScript('AIzaSyDDk6OlltVqeQ4H59ej6s0AU0NI3aeVF4U');
        }).catch(err => {
            notification.error({ message: "Network Issue" });
            notification.error({ message: "Contact Hubgo Team" });
        }).finally(() => {
            setSpin(false);
        })
       
    }, [])

    const addPackageName = () => {
        form.setFieldsValue({ 'packageType': packageName })
        if (packageName.trim() !== '') {
            setPackageOptions((prevOptions) => [
                ...prevOptions,
                { label: packageName, value: packageName },
            ]);
            setPackageName('');
        }
    };
    const addPackageContent = () => {
        if (packageContent.trim() !== '') {
            const exists = packageContentOptions.some(
                (option) => option.value.toLowerCase() === packageContent.trim().toLowerCase()
            );

            if (!exists) {
                setPackageContentOptions((prevOptions) => [
                    ...prevOptions,
                    { label: packageContent, value: packageContent },
                ]);
                form.setFieldValue('packageContent', packageContent); // Update form field value
                setPackageName(''); // Clear the input field
            } else {
                message.warning('This package content already exists.');
            }
        }
    };

    const handleSave = (row: CartItem) => {
        const newData = [...items];
        const index = newData.findIndex(item => row.cartItrr === item.cartItrr);
        newData.splice(index, 1, row);
        setItems(newData);
    };

    //ADD TO ITEMS
    const addItem = (item: CartItem) => {
        let cartItr = Math.random().toString(36).substr(2, 9);

        let basePrice = 0;
        let productSize = item.productSize;

        let fixedSize = ['L', 'M', 'S', 'XS']
        if (fixedSize.includes(productSize)) {
            let size = productSize;
            basePrice = getFixedPackageBasePrice(size);
            item.basePrice = basePrice;
        } else {
            let l = customDimensions.length;
            let w = customDimensions.breadth;
            let h = customDimensions.height;
            const volumetricWeight = calculateVolumetricWeight(l, w, h);
            const effectiveWeight = Math.max(
                volumetricWeight,
                weight
            );
            basePrice = getCustomPackageBasePrice(effectiveWeight);
            item.basePrice = basePrice;

        }
        let itr = 1;
        let newItems = [];
        let currentItems = items;
        currentItems.push(item);


        for (let i = 0; i < currentItems.length; i++) {
            let cartItem = currentItems[i]
            let size = cartItem.productQuantity;
            if (size > 1) {
                for (let j = 0; j < size; j++) {
                    let newItem = structuredClone(cartItem);
                    newItem.cartItrr = itr;
                    newItem.productQuantity = 1;
                    newItems.push(newItem)
                    itr++;
                }
            } else {
                cartItem.cartItrr = itr;
                newItems.push(cartItem);
                itr++;
            }

        }
        let data: any = [];
        const sortedItems = [...newItems].sort((a, b) => {
            const priorityA = getPackageSizePriority(a.productSize);
            const priorityB = getPackageSizePriority(b.productSize);
            if (priorityA === priorityB) {
                return b.basePrice - a.basePrice;
            }
            return priorityB - priorityA;
        });

        sortedItems.map((item, index) => {
            const discountPercentage = Math.min(
                index === 0 ? 0 : settings.discountIncrement * index,
                settings.maxDiscount
            );
            let discount = discountPercentage / 100;
            item.basePrice = item.basePrice * item.productQuantity;
            item.discount = discountPercentage
            const discountAmount = item.basePrice * discount;
            item.hubgoCharges = item.basePrice - discountAmount;
            data.push(item);
        });
        let totalProductValue=0;
        let subTotalValue=0;
        let totalTransportChargesValue=0;
        data.forEach((d)=>{
            totalProductValue+=Number(d.productValue);
            subTotalValue+=d.hubgoCharges?d.hubgoCharges:0;
            totalTransportChargesValue+=Number(d.transportCharges?d.transportCharges:0);
        })
        setSubTotal(subTotalValue);
        setTotalProductValue(totalProductValue);
        setTotalTransportCharges(totalTransportChargesValue);
        setItems(data)








    };
    const removeItem = (itr: number) => {
        let data=items.filter(item => item.cartItrr !== itr)
        let totalProductValue=0;
        let subTotalValue=0;
        let totalTransportChargesValue=0;
        data.forEach((d)=>{
            totalProductValue+=Number(d.productValue);
            subTotalValue+=d.hubgoCharges?d.hubgoCharges:0;
            totalTransportChargesValue+=Number(d.transportCharges?d.transportCharges:0);
        })
        setSubTotal(subTotalValue);
        setTotalProductValue(totalProductValue);
        setTotalTransportCharges(totalTransportChargesValue);
        setItems(data)
    };
   

    const mcolumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        
        {
            title: 'Package Type',
            dataIndex: 'packageType',
            key: 'packageType',
        },
        {
            title: 'Package Content',
            dataIndex: 'packageContent',
            key: 'packageContent',
        },
        {
            title: 'Package Size',
            dataIndex: 'productSize',
            key: 'productSize',
        },
        {
            title: 'Quantity',
            dataIndex: 'productQuantity',
            key: 'productQuantity',
        },

        {
            title: 'Base Price',
            dataIndex: 'basePrice',
            key: 'basePrice',
            render: (value: number) => `₹${value}`,
        },
        
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            width:'10%',
            render: (value: any, record:any) =>
                
                {


            
                return  value > 0 ?
                <>
               
                    -{value}% (₹{record.basePrice-record.hubgoCharges})
                    </>
                : (
                  '-'
                )
            }
        },

        {
            title: 'ProductValue',
            dataIndex: 'productValue',
            key: 'productValue',
            // editable: true,
            render: (value: number) => `₹${value}`,
        },
        {
            title: 'Transport Charges',
            dataIndex: 'transportCharges',
            key: 'transportCharges',
            // editable: true,
            render: (value: number) => `₹${value}`,
        },
        {
            title: 'hubgoCharges',
            dataIndex: 'hubgoCharges',
            key: 'hubgoCharges',
            render: (value: number) => `₹${value}`,
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'x',
            render: (re: any, record: any) => (
                <Button
                    type="link"
                    danger
                    onClick={() => removeItem(record.cartItrr)}
                >
                    Remove
                </Button>
            ),
        }
    ];
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = mcolumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });




    const handleSubmit = async (values: any) => {
        // setSpin(true);
        if (!waybillNo || !address) {
            setSpin(false);
            message.error('Please fill in Waybill Number and Address in Receiver Information');
            return;

        } 
        if (distance == 0) {
            if (!pincode) {
                setSpin(false);
                notification.error({ message: "Please Enter Pincode!", duration: 2 });

            } else {
                if (window.google) {
                    const geocoder = new google.maps.Geocoder();

                    await geocoder.geocode({ address: `${pincode} Chennai, Tamil Nadu, India`, }, async (results, status) => {
                        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
                            const lat = results[0].geometry.location.lat();
                            const lng = results[0].geometry.location.lng();
                            if (senderHubCoordinates != null && lat && lng) {
                                calculateRouteDistance({ lat: senderHubCoordinates.toString().split(",")[0], lng: senderHubCoordinates.toString().split(",")[1] }, { lat, lng }).then((kms) => {
                                    console.log(kms);
                                    const cartItem = {
                                        waybillNo,
                                        pincode,
                                        packageType: values.packageType,
                                        productSize: values.productSize,
                                        packageContent: values.packageContent,
                                        productQuantity: values.productQuantity || 1,
                                        productValue: Number(values.productValue),
                                        transportCharges: Number(values.transportCharges?values.transportCharges:0),
                                        hubgoCharges: 0
                                    };
                                    addItem(cartItem);
                                    message.success('Package added to cart');
                                    form.resetFields(['packageType', 'productSize', 'packageContent', 'productQuantity', 'productValue', 'transportCharges']);
                                })
                            }
                        } else {
                            console.error("Geocode was not successful for the following reason: " + status);
                            notification.error({ message: "Unable to get Pincode location" });
                        }
                    });
                } else {
                    console.error("Geocode was not successful for the following reason: " + status);
                    notification.error({ message: "Unable to get Pincode location" });
                }
            }
        } else {
            const cartItem = {
                waybillNo,
                pincode,
                packageType: values.packageType,
                productSize: values.productSize,
                packageContent: values.packageContent,
                productQuantity: values.productQuantity || 1,
                productValue: Number(values.productValue),
                transportCharges: Number(values.transportCharges?values.transportCharges:0),
                hubgoCharges: 0
            };
            console.log(cartItem);
            addItem(cartItem);
            message.success('Package added to cart');
            form.resetFields(['packageType', 'productSize', 'packageContent', 'productQuantity', 'productValue', 'transportCharges']);
        }
    };


    const handleBooking = () => {
        setSpin(true);

        if (!waybillNo || !address || !items.length) {
            message.error('Please fill in Waybill Number and Pincode in Receiver Information');
        } else {
            if (!senderName || !senderMobileNo) {
                message.error('Please fill in Sender Name and Mobile Number');
            } else {
                if (!receiverName || !receiverMobileNo) {
                    message.error('Please fill in Receiver Name and Mobile Number');
                } else {
                    if (!address || !pincode) {
                        message.error('Please fill in Address and Pincode');
                    } else {
                        let bookingJSON = {
                            waybillId: waybillNo,
                            senderName: senderName,
                            senderMobileNo: senderMobileNo,
                            receiverName: receiverName,
                            receiverMobileNo: receiverMobileNo,
                            senderHubCoordinates: senderHubCoordinates,
                            receiverCoordinates: receiverCoordinates,
                            address: address,
                            pincode: pincode,
                            bookedByTA: parseInt(bookedByTA),
                            distance: distance,
                            productDetailsDTOList: items,
                            paymentMethod: paymentMethod,
                            totalProductValue: totalProductValue,
                            totalTransportAmount: totalTransportCharges,
                            totalHubgoAmount: totalhubGoCharges
                        };
                        console.log(bookingJSON);
                        postData(`/api/booking/book-order?userId=${bookedByTA}`, bookingJSON).then((res: any) => {
                            console.log(res);
                            if (!res.orderId && !res.packageId) {
                                notification.error({ message: res.message });
                            } else {
                                notification.success({ message: 'Booking successful' });
                                resetFields();
                            }
                         
                        }).catch((err) => {
                            console.log(err);
                            notification.error({ message: 'Error booking' });
                        }).finally(()=>{
                            setSpin(false);
                        })

                        return;
                    }
                }
            }
            return;
        }
    }
    const showResetConfirm = () => {
        Modal.confirm({
          title: 'Confirm Reset',
          content: 'Are you sure you want to reset details entered in the Booking?',
          okText: 'Yes, Reset',
          cancelText: 'Cancel',
          onOk() {
            resetFields();
          },
        });
      };
    const resetFields=()=>{
       
        form.resetFields();
        cform.resetFields(['senderName', 'senderPhoneNo','waybillNo','receiverName','receiverMobileNo','pincode','address']);
        setSenderName(null);
        setSenderMobileNo(null);setReceiverName(null);setReceiverMobileNo(null);
        setReceiverCoordinates(null);setAddress(null);setPincode(null)
        setDistance(0);setItems([]);setPaymentMethod(null);setTotalProductValue(0);setTotalTransportCharges(0);setTotalhubGoCharges(0);
        setItems([]);setWaybillNo(null);
        setSubTotal(0);

      
        
    }


    return (
        <Spin
            indicator={<LoadingOutlined spin />}
            size="large"
            spinning={spin}
        >
            {isPriceSettingLoaded &&
            <Content className="p-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                        <div className="flex items-center mb-4">
                            <Package className="mr-2 text-orange-500" />
                            <h2 className="text-lg font-semibold">Receiver Information</h2>
                        </div>

                        <Form form={cform}>
                            <div>
                                <Row>
                                    <h3 className="font-medium mb-4">From</h3>

                                </Row>
                                <Row>
                                    <Col span={7}>

                                        <Form.Item label="Sender Name" name='senderName'>
                                            <Input placeholder="Enter sender name" onChange={(e) => setSenderName(e.target.value)} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={1}></Col>
                                    <Col span={7} >

                                        <Form.Item label="Sender Ph.No" name='senderPhoneNo' >
                                            <Input placeholder="Enter phone number" onChange={(e) => setSenderMobileNo(e.target.value)} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <h3 className="font-medium mb-4">To</h3>
                                </Row>
                                <Row>
                                    <Col span={7}>
                                        <Form.Item label="Waybill/LR No" name='waybillNo'>
                                            <Input placeholder="Enter waybill/LR number" onChange={(e) => setWaybillNo(e.target.value)} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={1} />
                                    <Col span={7}>
                                        <Form.Item label="Name" name='receiverName'>
                                            <Input placeholder="Enter receiver name" onChange={(e) => setReceiverName(e.target.value)} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={1} />
                                    <Col span={7}>
                                        <Form.Item label="Ph.No"  name='receiverMobileNo'>
                                            <Input placeholder="Enter phone number" onChange={(e) => setReceiverMobileNo(e.target.value)} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>

                                    <Col span={7}>
                                        <Form.Item label="Pin Code" name="pincode">
                                            <Input placeholder="Enter pin code" onChange={(e) => setPincode(e.target.value)} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={1} />
                                    <Col span={7}>
                                        <Form.Item label="Address" name="address">

                                            <AutoComplete
                                                options={options}
                                                onSearch={handleAddressSearch}
                                                onSelect={handleAddressSelect}

                                                style={{ width: 300 }}
                                            >
                                                <Input.Search placeholder="Search places" onChange={(e) => setAddress(e.target.value)} />
                                            </AutoComplete>

                                            {/* <Input.TextArea placeholder="Enter complete address"  */}
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                        <div className="flex items-center mb-4">
                            <Box className="mr-2 text-orange-500" />
                            <h2 className="text-lg font-semibold">Package Details</h2>
                        </div>
                        <Form form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Form.Item
                                    label="Packaging Type"
                                    name="packageType"
                                    rules={[{ required: true, message: 'Please select packaging type' }]}
                                >
                                    <Select
                                        placeholder="Select Packaging"
                                        options={packageOptions}
                                        allowClear
                                        dropdownRender={(menu) => (
                                            <div>
                                                {menu}
                                                <Divider style={{ margin: '8px 0' }} />
                                                <span style={{ margin: '8px 4px' }}>Others</span>
                                                <Space style={{ padding: '0 8px 4px' }}>
                                                    <Input
                                                        placeholder="Specify Package Content"
                                                        value={packageName}
                                                        onChange={(e) => setPackageName(e.target.value)}
                                                    />
                                                    <Button
                                                        type="text"
                                                        icon={<PlusOutlined />}
                                                        onClick={() => {
                                                            addPackageName();
                                                            document.activeElement.blur(); // Close the dropdown
                                                        }}
                                                    />
                                                </Space>
                                            </div>
                                        )}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Package Size"
                                    name="productSize"
                                    rules={[{ required: true, message: 'Please select a package size' }]}
                                >
                                    <Select
                                        placeholder="Select Your Package Size"
                                        options={predefinedOptions}
                                        dropdownRender={(menu) => (
                                            <div>
                                                {menu}
                                                <Divider style={{ margin: '8px 0' }} />
                                                <span style={{ margin: '8px 4px' }}>Others</span>
                                                <div style={{ padding: '8px' }}>
                                                    <div style={{ marginBottom: '8px' }}>
                                                        <span>Package Dimensions</span>
                                                        <Radio.Group
                                                            value={unit}
                                                            onChange={(e) => setUnit(e.target.value)}
                                                            style={{ marginLeft: '16px' }}
                                                        >
                                                            <Radio.Button value="cm">cm</Radio.Button>
                                                            <Radio.Button value="in">In</Radio.Button>
                                                        </Radio.Group>
                                                    </div>
                                                    <Space>
                                                        <Input
                                                            placeholder="L"
                                                            value={customDimensions.length}
                                                            onChange={(e) =>
                                                                handleCustomInput('length', e.target.value)
                                                            }
                                                            style={{ width: 60 }}
                                                        />
                                                        <Input
                                                            placeholder="B"
                                                            value={customDimensions.breadth}
                                                            onChange={(e) =>
                                                                handleCustomInput('breadth', e.target.value)
                                                            }
                                                            style={{ width: 60 }}
                                                        />
                                                        <Input
                                                            placeholder="H"
                                                            value={customDimensions.height}
                                                            onChange={(e) =>
                                                                handleCustomInput('height', e.target.value)
                                                            }
                                                            style={{ width: 60 }}
                                                        />
                                                    </Space>
                                                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}>
                                                        <Input
                                                            placeholder="Enter Package Weight"
                                                            value={weight}
                                                            onChange={(e) => setWeight(e.target.value)}
                                                            addonAfter="Kgs"
                                                            style={{ flex: 1 }}
                                                        />
                                                        <Button
                                                            type="text"
                                                            icon={<PlusOutlined />}
                                                            onClick={() => { addCustomPackage(); document.activeElement.blur(); }}
                                                            style={{ marginLeft: '8px' }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Package Content"
                                    name="packageContent"
                                    rules={[{ required: true, message: 'Please select package content' }]}
                                >
                                    <Select
                                        placeholder="Select Your Package Content"
                                        options={packageContentOptions}
                                        dropdownRender={(menu) => (
                                            <div>
                                                {menu}
                                                <Divider style={{ margin: '8px 0' }} />
                                                <span style={{ margin: '8px 4px' }}>Others</span>
                                                <Space style={{ padding: '0 8px 4px' }}>
                                                    <Input
                                                        placeholder="Specify Package Content"
                                                        value={packageContent}
                                                        onChange={(e) => setPackageContent(e.target.value)}
                                                    />
                                                    <Button
                                                        type="text"
                                                        icon={<PlusOutlined />}
                                                        onClick={() => {
                                                            addPackageContent();
                                                            document.activeElement.blur();
                                                        }}
                                                    />
                                                </Space>
                                            </div>
                                        )}
                                        onDropdownVisibleChange={(open) => {
                                            if (!open) setPackageContent(''); // Clear the input field when dropdown closes
                                        }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Quantity"
                                    name="productQuantity"
                                    initialValue={1}
                                    rules={[{ required: true, message: 'Enter Quantity' },
                                       
                                    ]}
                                >
                                    <InputNumber min={1} max={1000}  placeholder="Quantity" style={{ width: '100%' }} />
                                </Form.Item>
                            </div>
                            <div className="flex justify-end grid-cols-1 md:grid-cols-4 gap-4">
                            <Form.Item
                                    label="Product Value"
                                    name="productValue"
                                    rules={[{ required: true, message: 'Enter Product Value' }]}
                                >
                                    <Input placeholder="Value"  style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item
                                    label="Transport Charges per Package"
                                    name="transportCharges"
                             
                                    // rules={[{ required: true, message: 'Enter productValue' }]}
                                >
                                    <Input   placeholder="Value" style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item>

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{marginTop:'22%'}}
                                    icon={<Plus className="w-4 h-4" />}
                                >
                                    Add to Cart
                                </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center mb-4">
                            <ShoppingCart className="mr-2 text-orange-500" />
                            <h2 className="text-lg font-semibold">Checkout Page</h2>
                        </div>
                        {/* <Table columns={columns} dataSource={items} pagination={false} /> */}
                        <Space direction="vertical" className="w-full">
                                                  
            <Text type="secondary">
              First {freeKm}km free, {freeKm + 1}-{firstTier.uptoKm}km: flat ₹
              {firstTier.price}, {firstTier.uptoKm + 1}-{secondTier.uptoKm}km: flat ₹
              {secondTier.price}, {secondTier.uptoKm + 1}-{thirdTier.uptoKm}km: flat ₹
              {thirdTier.price}, Beyond {thirdTier.uptoKm}km: ₹{thirdTier.price} + ₹
              {beyondPrice}/km
            </Text>
                        <Table
                            components={components}
                            rowClassName={() => 'editable-row'}
                            bordered
                            dataSource={items}
                            columns={columns as ColumnTypes}
                            summary={() => (
                                <Table.Summary>
                                  {/* <Table.Summary.Row>
                                    <Table.Summary.Cell index={0} colSpan={6}>
                                      <Text strong>Sub Total</Text>
                                    </Table.Summary.Cell>
                
                         
                                    <Table.Summary.Cell index={2} >
                                        <Text>₹{Number(totalProductValue)}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={3} >
                                        <Text>₹{Number(totalTransportCharges)}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={4} >
                                    <Text strong>₹{Number(subtotal)}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={5} />
                                  
                                  </Table.Summary.Row> */}
                                  <Table.Summary.Row>
                                    <Table.Summary.Cell index={0} colSpan={8}>
                                      <Text strong>Distance Charge ({distance} km)</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}>
                                      <Text strong>₹{calculateDistanceCharge(distance)}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={2} />
                                  </Table.Summary.Row>
                                  <Table.Summary.Row>
                                    <Table.Summary.Cell index={0} colSpan={6}>
                                      <Text strong type="success">Total Amount</Text>
                                    </Table.Summary.Cell>
             

                
                         
                                    <Table.Summary.Cell index={1} >
                                        <Text>₹{Number(totalProductValue)}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={2} >
                                        <Text>₹{Number(totalTransportCharges)}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={3}>
                                      <Text strong type="success">₹{Number(subtotal)+ calculateDistanceCharge(distance)}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={5} />
                                    <Table.Summary.Cell index={2} />
                                  </Table.Summary.Row>
                                </Table.Summary>
                              )}
                        />
                          <Divider />
    
     
          
          <div className="flex justify-between items-center">
            <Space>
              <Calculator className="w-5 h-5" />
              <Title level={4} style={{ margin: 0 }}>Total Price</Title>
            </Space>
            <Title level={3} type="success" style={{ margin: 0 }}>
              ₹{Number(subtotal)+ calculateDistanceCharge(distance)}
            </Title>
          </div>
          
                                        

                        <div className="mt-6 flex justify-between items-center">
                            <div>
                                <h3 className="font-medium mb-2">Payment Collection</h3>
                                <Radio.Group defaultValue="PREPAID" onChange={(e) => setPaymentMethod(e.target.value)}>
                                    <Radio value="PREPAID">Prepaid</Radio>
                                    <Radio value="HUBGOCOD">Door Delivery Charges only</Radio>
                                    <Radio value="COD">Cash on delivery (Transport Charges+ Door Delivery Charges)</Radio>
                                </Radio.Group>
                            </div>

                            <Space className="text-right">
                            <Button
                                    type="default"
                                    size="large"
                                    className="bg-grey-500"
                                    onClick={showResetConfirm}
                                >
                                    Reset
                                </Button>

                                <Button
                                    type="primary"
                                    size="large"
                                    className="bg-orange-500"
                                    disabled={items.length === 0}
                                    onClick={handleBooking}
                                >
                                    Confirm Booking
                                </Button>
                            </Space>
                        </div>
                        </Space>
                    </div>
                </div>
            </Content>}
        </Spin>
    );
}

export default Bookings;
export interface Product {
    id: string;
    sku: string;
    image: string;
    name: string;
    shortName: string;
    identifier: string;
    productType: string;
    brand: string;
    category: string;
    quantity: number;
    stock: number;
    mrp: string;
    price: string;
    businessPrice: string;
    manufacturer: string;
    hsnCode: string;
    ppuCount: number;
    unit: string;
    tax: string;
    manufacturingPartNumber: string;
    gender: string;
    status: "Active" | "Draft" | "Archived";
    description?: string;
    rating?: number;
}

export const mockProducts: Product[] = [
    {
        id: "1",
        sku: "SKU-001",
        image: "/images/product/product-01.jpg",
        name: "Apple Watch Series 7",
        shortName: "Apple Watch 7",
        identifier: "EAN1234567890",
        productType: "Electronics",
        brand: "Apple",
        category: "Electronics",
        quantity: 1,
        stock: 22,
        mrp: "$299",
        price: "$269",
        businessPrice: "$250",
        manufacturer: "Apple",
        hsnCode: "8517",
        ppuCount: 1,
        unit: "pcs",
        tax: "18%",
        manufacturingPartNumber: "AW7-FG45",
        gender: "Unisex",
        status: "Active",
        description: "The latest Apple Watch with a larger display and faster charging.",
        rating: 4.5,
    },
    {
        id: "2",
        sku: "SKU-002",
        image: "/images/product/product-02.jpg",
        name: "Macbook Pro M1 testing a long title of product for table layout responsive design",
        shortName: "Macbook Pro M1",
        identifier: "EAN0987654321",
        productType: "Computers",
        brand: "Apple",
        category: "Computers",
        quantity: 1,
        stock: 15,
        mrp: "$1499",
        price: "$1299",
        businessPrice: "$1200",
        manufacturer: "Apple",
        hsnCode: "8471",
        ppuCount: 1,
        unit: "pcs",
        tax: "18%",
        manufacturingPartNumber: "MBP-M1-ABC",
        gender: "Unisex",
        status: "Active",
        description: "Powerful Macbook Pro with Apple's M1 chip for incredible performance.",
        rating: 4.8,
    },
    {
        id: "3",
        sku: "SKU-003",
        image: "/images/product/product-03.jpg",
        name: "Sony WH-1000XM4",
        shortName: "Sony XM4",
        identifier: "EAN1122334455",
        productType: "Audio",
        brand: "Sony",
        category: "Audio",
        quantity: 1,
        stock: 0,
        mrp: "$399",
        price: "$348",
        businessPrice: "$300",
        manufacturer: "Sony",
        hsnCode: "8518",
        ppuCount: 1,
        unit: "pcs",
        tax: "18%",
        manufacturingPartNumber: "WH1000XM4-BLK",
        gender: "Unisex",
        status: "Archived",
        description: undefined,
        rating: 4.7,
    },
    {
        id: "4",
        sku: "SKU-004",
        image: "/images/product/product-04.jpg",
        name: "Amazon Echo Dot",
        shortName: "Echo Dot",
        identifier: "EAN6677889900",
        productType: "Smart Home",
        brand: "Amazon",
        category: "Smart Home",
        quantity: 1,
        stock: 150,
        mrp: "$59",
        price: "$49",
        businessPrice: "$40",
        manufacturer: "Amazon",
        hsnCode: "8517",
        ppuCount: 1,
        unit: "pcs",
        tax: "18%",
        manufacturingPartNumber: "ECHO-DOT-4GEN",
        gender: "Unisex",
        status: "Draft",
        description: undefined,
        rating: 4.2,
    }

];

export type ProductFormData = Partial<Omit<Product, 'id'>>;

export const getProductById = async (id: string): Promise<Product | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProducts.find(p => p.id === id) || null;
};

// const updateProduct = async (productData: Product): Promise<Product> => {
//     console.log("Updating product:", productData);

//     await new Promise(resolve => setTimeout(resolve, 500));

//     return productData;
// };

export type NewProductFormData = Omit<Product, 'id' | 'rating'> & {
    image?: string;
};

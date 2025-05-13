export interface Product {
    id: string;
    image: string;
    name: string;
    category: string;
    price: string;
    stock: number;
    status: "Active" | "Draft" | "Archived";
    description?: string;
    rating?: number;
}

export const mockProducts: Product[] = [
    {
        id: "1",
        image: "/images/product/product-01.jpg",
        name: "Apple Watch Series 7",
        category: "Electronics",
        price: "$269",
        stock: 22,
        status: "Active",
        description: "The latest Apple Watch with a larger display and faster charging.",
        rating: 4.5,
    },
    {
        id: "2",
        image: "/images/product/product-02.jpg",
        name: "Macbook Pro M1 testing a long title of product for table layout responsive design",
        category: "Computers",
        price: "$1299",
        stock: 15,
        status: "Active",
        description: "Powerful Macbook Pro with Apple's M1 chip for incredible performance.",
        rating: 4.8,
    },
    {
        id: "3",
        image: "/images/product/product-03.jpg",
        name: "Sony WH-1000XM4",
        category: "Audio",
        price: "$348",
        stock: 0,
        status: "Archived",
        rating: 4.7,
    },
    {
        id: "4",
        image: "/images/product/product-04.jpg",
        name: "Amazon Echo Dot",
        category: "Smart Home",
        price: "$49",
        stock: 150,
        status: "Draft",
        rating: 4.2,
    }

];
export type ProductFormData = Partial<Omit<Product, 'id'>>;
export const getProductById = async (id: string): Promise<Product | null> => {

    await new Promise(resolve => setTimeout(resolve, 500));
    const mockProducts: Product[] = [
        {
            id: "1",
            image: "/images/product/product-01.jpg",
            name: "Apple Watch Series 7 12222",
            category: "Electronics",
            price: "$269",
            stock: 22,
            status: "Active",
            description: "The latest Apple Watch with a larger display and faster charging.",
            rating: 4.5,
        },
        {
            id: "2",
            image: "/images/product/product-02.jpg",
            name: "Macbook Pro M1",
            category: "Computers",
            price: "$1299",
            stock: 15,
            status: "Active",
            description: "Powerful Macbook Pro with Apple's M1 chip for incredible performance.",
            rating: 4.8,
        },
        {
            id: "3",
            image: "/images/product/product-03.jpg",
            name: "Sony WH-1000XM4",
            category: "Audio",
            price: "$348",
            stock: 0,
            status: "Archived",
            rating: 4.7,
        },
        {
            id: "4",
            image: "/images/product/product-04.jpg",
            name: "Amazon Echo Dot",
            category: "Smart Home",
            price: "$49",
            stock: 150,
            status: "Draft",
            rating: 4.2,
        }

    ];
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

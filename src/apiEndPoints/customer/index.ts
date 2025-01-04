const Customer = {
    signUp: {
        url: "/customer/sigup",
        method: "POST"
    },
    signIn: {
        url: "/customer/login",
        method: "POST"
    },
    getProducts: {
        url: "/product",
        method: "GET",
    },
    addInToCart:{
        url: "/cart",
        method: "POST"
    },
    readUnread: (id: number) => ({
        url: `/activity/${id}`,
        method: "PATCH",
    }),
};
export default Customer;
export default {
    getPostsForCustomer: (axios) => axios.get('/api/newspublic/Posts/getPostsForCustomer'),
    getServicesPackForHome: (axios) => axios.get('/api/newspublic/Services/getServicesPackForHome'),
    getBanners: (axios) => axios.get('/api/newspublic/Banner/getBanners'),
    getListPostsForMostView: (axios) => axios.get('/api/newspublic/Posts/getListPostsForMostView'),
    // lấy theo loại tin
    getPostsToTypeForCustomer: (axios) => axios.get('/api/newspublic/Posts/getPostsToTypeForCustomer'),
}
  
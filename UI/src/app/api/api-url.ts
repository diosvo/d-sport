import { environment } from 'src/environments/environment';

export class ApiUrl {
    static BaseUrl = environment.SERVER_URL;

    // Authentication
    public static Login = ApiUrl.BaseUrl + '/auth/login'
    public static Register = ApiUrl.BaseUrl + '/auth/register'
    public static ValidateEmail = ApiUrl.BaseUrl + '/users/validate/'

    // About Product
    public static HomePage = ApiUrl.BaseUrl + '/products'
    public static ClassifyPage = ApiUrl.BaseUrl + '/products/classify'
    public static AccessoriesPage = ApiUrl.BaseUrl + '/products/category/accessories'
    public static ProductDetails = ApiUrl.BaseUrl + '/products/'

    // Order
    public static SingleOrder = ApiUrl.BaseUrl + '/orders/'
    public static OrderPayment = ApiUrl.BaseUrl + '/orders/payment'
    public static OrderNew = ApiUrl.BaseUrl + '/orders/new'

    // Token
    public static RefreshToken = ApiUrl.BaseUrl + '/auth/refresh-token'
}
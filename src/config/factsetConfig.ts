import { 
    ApiClient
} from '@factset/sdk-factsetfundamentals';

function factsetInit(){
    const apiClient = ApiClient.instance;
    const FactSetApiKey = apiClient.authentications['FactSetApiKey'];
    FactSetApiKey.username = process.env.FACTSET_USERNAME;
    FactSetApiKey.password = process.env.FACTSET_PASSWORD;
}

export default factsetInit;
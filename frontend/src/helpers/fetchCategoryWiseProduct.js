import SummaryApi from "../common";

const fetchCategoryWiseProduct = async (category)=>{
    const fetchResponse = await fetch(SummaryApi.categoryWiseProduct.url,{
        method:SummaryApi.categoryWiseProduct.method,
        headers :{
            "content-type" : "application/json"
        },
        body:JSON.stringify({
            category
        })
    });

    const dataResponse = await fetchResponse.json();

    return dataResponse;
}

export default fetchCategoryWiseProduct;
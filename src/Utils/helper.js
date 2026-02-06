import moment from "moment";
import { BASE_URL } from "./apiPaths";

export const validateEmail = (email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

export const getInitials = (name) =>{
    if(!name) return "";
    const words = name.split(" ")
    let initials = ""

    for(let i=0; i<Math.min(words.length, 2); i++ ){
        initials += words[i][0]
    }

    return initials.toUpperCase()
};

export const getProfileImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // If it's a blob URL (preview), return it as is
    if (imagePath.startsWith("blob:")) return imagePath;

    // If it's a full URL
    if (imagePath.startsWith("http")) {
        // If it's a legacy localhost URL from the DB, replace it with the current BASE_URL
        if (imagePath.includes("http://localhost:8000")) {
            return imagePath.replace("http://localhost:8000", BASE_URL);
        }
        return imagePath;
    }

    // If it's a relative path, prepend BASE_URL
    return `${BASE_URL}/${imagePath}`;
};

export const addThousandsSeparator = (num) =>{
    if(num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart 
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = [])=>{
    const chartData = data.map((item)=>({
        category: item?.category,
        amount: item?.amount,
    }))

    return chartData;
};

export const prepareIncomeBarChartData = (data = [])=>{
    const sortedData = [...data].sort((a,b)=> new Date(a.date)-new Date(b.date));

    const chartData = sortedData.map((item)=>({
        month:moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        source: item?.source,
    }))
    return chartData;
};

export const prepareExpenseLineChartData = (data = [])=>{
    const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item)=>({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        category: item?.category,
    }))

    return chartData;
};


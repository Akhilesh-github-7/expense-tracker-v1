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

export const prepareExpenseBarChartData = (data = []) => {
    // Aggregate by category
    const aggregated = data.reduce((acc, item) => {
        const category = item?.category || "Other";
        acc[category] = (acc[category] || 0) + item.amount;
        return acc;
    }, {});

    return Object.keys(aggregated).map((key) => ({
        category: key,
        amount: aggregated[key],
    }));
};

export const prepareIncomeBarChartData = (data = []) => {
    // Sort by date first
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Aggregate by date (Daily Trend)
    const aggregated = sortedData.reduce((acc, item) => {
        const date = moment(item?.date).format('Do MMM');
        acc[date] = (acc[date] || 0) + item.amount;
        return acc;
    }, {});

    return Object.keys(aggregated).map((key) => ({
        month: key,
        amount: aggregated[key],
    }));
};

export const prepareExpenseLineChartData = (data = []) => {
    // Sort by date first
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Aggregate by date (Daily Trend)
    const aggregated = sortedData.reduce((acc, item) => {
        const date = moment(item?.date).format('Do MMM');
        acc[date] = (acc[date] || 0) + item.amount;
        return acc;
    }, {});

    return Object.keys(aggregated).map((key) => ({
        month: key,
        amount: aggregated[key],
    }));
};


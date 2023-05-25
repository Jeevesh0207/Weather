
let a = []
let placewh = document.getElementById("placewh")

const fun = async () => {
    if (placewh.value != "") {
        let s = ""
        for (let i = 0; i < placewh.value.length; i++) {
            if (placewh.value[i] == ',') {
                a.push(s);
                s = "";
                continue;
            }
            s += placewh.value[i];

        }
        a.push(s);
    }
    else{
        return 0
    }
    document.getElementById("placewh").value = ""
}

const del_loc=async()=>{
    a=[]
}

const mylocfind = async () => {

    let a = await fun()
    if(a==0)return
    let c = await setval()
    let b = await myfun()
    let d = await del_loc()

}


let name;
let region;
let con;
const setval = async () => {
    name = a[0]
    region = a[1]
    con = a[2]
}




const myfun = async () => {

    // const url1 = `https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=${name}%20City%20${region}%20${con}&accept-language=en&polygon_threshold=0.0`;
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': 'a5f854a4a4msh945ec253c144a4ap115a70jsn37a5f41be8ec',
    //         'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
    //     }
    // };
    const url1 = `https://foreca-weather.p.rapidapi.com/location/search/${name}?lang=en&${region},country=${con}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a5f854a4a4msh945ec253c144a4ap115a70jsn37a5f41be8ec',
            'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
        }
    };

    let lt, lo
    await fetch(url1, options).then((response) => {
        return response.json()
    }).then((value) => {
        // console.log(value)
        // lt = value[0].lat;
        // lo = value[0].lon;
        lt = value.locations[0].lat;
        lo = value.locations[0].lon;
    })
    console.log(lt)
    console.log(lo)


    const url2 = `https://weatherapi-com.p.rapidapi.com/current.json?q=${lt}%2C${lo}`
    const option = {
        method: "GET",
        headers: {
            'X-RapidAPI-Key': 'a5f854a4a4msh945ec253c144a4ap115a70jsn37a5f41be8ec',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }

    }


    await fetch(url2, option).then((response) => {
        return response.json()
    }).then((value) => {
        console.log(value)
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let d = new Date();
        let dayName = days[d.getDay()];
        let report_data=document.getElementById("report_data")
        
        
        ihtml=""
        ihtml=
        `
        <div class="bottom">
            <div class="location">
                <p>${value.location.name}<br> ${value.location.region}, ${value.location.country}</p>
            </div>
            <div class="day">
                <p><i class="fa-solid fa-calendar-days"></i>${dayName}</p>
            </div>
            <div class="box_data">
                <p><i class="fa-sharp fa-solid fa-droplet"></i>${value.current.humidity} %</p>
                <p><i class="fa-sharp fa-solid fa-wind"></i>${value.current.wind_kph} km/h</p>
                <p><i class="fa-solid fa-square-parking"></i>${value.current.pressure_in} mb</p>
            </div>
            <div class="temp">
                <p><ion-icon name="thermometer-outline"></ion-icon>${value.current.temp_c}(C)</p>
            </div>
            <div class="condition">
                 <div class="left" id="wea_ph">
                       <img src="img/news-report.png" alt="">
                 </div>
                 <div class="right">
                    <p>${value.current.condition.text}</p>
                 </div>
            </div>
        </div>
        
        `
        
       report_data.innerHTML=ihtml;

    }).catch((error) => {
        console.log(error)
    })



    return
}






// let name = "Bhagalpur"
// let region = "Bihar"
// let con = "India"




// const url = `https://foreca-weather.p.rapidapi.com/location/search/${name}?lang=en&${region},country=in`;
// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': 'a5f854a4a4msh945ec253c144a4ap115a70jsn37a5f41be8ec',
//         'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
//     }
// };

// fetch(url, options).then((response) => {
//     return response.json()
// }).then((value) => {
//     console.log(value)
// }).catch((error) => {
//     console.log(error)
// })
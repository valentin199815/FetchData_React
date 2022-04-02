import image from "../images/banner.jpeg";
import "./app.css";
const Banner = () =>{

    return (
        <div className="banner">
            <img src={image}></img>
            <h2>Join us</h2>      
        </div>
    )
}
export default Banner;
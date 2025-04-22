import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { useEffect, useState } from 'react'


export default function () {

  const [ search, setsearch ] = useState("");
  const [partsCat, setPartsCat] = useState([]);
  const [partsItem, setPartsItem] = useState([]);
  const loadData = async () =>{
    let response = await fetch('http://localhost:5000/api/displaydata',{
      method: 'POST',
      headers:{
        'content-type': 'application/json'
      }
    });

    response = await response.json();
    setPartsItem(response[0]);
    setPartsCat (response[1]);
   // console.log(response[0],response[1]);

  }
  useEffect(()=>{
    loadData();
  },[]);

  return (
    <div>
      <div> <Navbar /> </div>

      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ maxHeight: "500px" }}>
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: 10 }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" value = {search} onChange={(e)=>{setsearch(e.target.value);}} />
              {/*</button className="btn btn-outline-danger text-white bg-danger" type="submit">Search</>*/}
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://www.mattblattkiatr.com/blogs/3073/wp-content/uploads/2019/04/Stinger-Engine-e1554149972227.png" 
              className="d-block w-100" 
              style={{ filter: "brightness(40%)", objectFit: "cover", height: "500px" }} 
              alt="engine" />
          </div>
          <div className="carousel-item">
            <img src="https://i0.wp.com/bestsellingcarsblog.com/wp-content/uploads/2016/07/dual_clutch_transmission.-Picture-courtesy-eagletransmission.com_.jpg" 
              className="d-block w-100" 
              style={{ filter: "brightness(40%)", objectFit: "cover", height: "500px" }} 
              alt="transmission" />
          </div>
          <div className="carousel-item">
            <img src="https://media.istockphoto.com/id/479206977/photo/automotive-water-pump.jpg?s=612x612&w=0&k=20&c=B-iMPmUFs7IkspSBsdpKx6q-N6iOHzHmeyL_pHOXdS0=" 
              className="d-block w-100" 
              style={{ filter: "brightness(40%)", objectFit: "cover", height: "500px" }} 
              alt="WaterPump" />
          </div>
          <div className="carousel-item">
            <img src="https://www.mach1services.com/wp-content/uploads/2020/09/car-battery-work.jpg" 
              className="d-block w-100" 
              style={{ filter: "brightness(40%)", objectFit: "cover", height: "500px" }} 
              alt="battery" />
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
          </div>
      </div>
      <div className='container'>{
        partsCat.length > 0
        ? partsCat.map((data)=>{
          return (
            <div className='row mb-3'>
            <div key = {data._id} className='fs-3 m-3'>{data.CategoryName}</div>
            <hr />
            { partsItem.length > 0 ? partsItem.filter((item)=> (item.CategoryName ===data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))) 
            .map(
              filterItems=>{
                return(
                  <div key = {filterItems._id} className=' col-12 col-md-6 col-lg-3  '>
                    <Card partItem={filterItems}
                    options = {filterItems.options[0]}
                    
                    ></Card>
                  </div>
                )
              }
            ) : <div> No Data Found </div>}
            </div>
          )
        })
        : ""
        }
      </div>
      <div><Footer /></div>
    </div>
  )
}

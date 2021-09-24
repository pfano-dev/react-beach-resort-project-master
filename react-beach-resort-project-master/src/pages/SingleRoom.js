import React, { Component } from 'react'
import { RoomContext } from '../context';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import defaultBcg from '../images/room-3.jpeg';
export default class Booknow extends Component {
    constructor (props){
        super(props);
        this.state = {
        slug: this.props.match.params.slug,
        defaultBcg,
        startDate: new Date(),
        endDate: new Date(),
    };
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    }
    handleChangeStart(date) {
        this.setState({
        startDate: date
        });
    }
    handleChangeEnd(date) {
        this.setState({
        endDate: date
        });
    }
    calculateDaysLeft(startDate, endDate) {
        if (!moment.isMoment(startDate)) startDate = moment(startDate);
        if (!moment.isMoment(endDate)) endDate = moment(endDate);
        return endDate.diff(startDate, "days");
    }
    static contextType = RoomContext;
    render() {
        const { getRoom } = this.context;
        const room = getRoom(this.state.slug);
        const { startDate, endDate } = this.state;
        const daysLeft = this.calculateDaysLeft(startDate, endDate);
    if(!room){
        return (<div className="container roomerror">
            <div className="row my-5">
                <div className="col-md-6 col-12 mx-auto">
                    <div className="card shadow-lg border-0 p-4 error">
                        <h1 className="text-center display-4">SORRY</h1>
                        <h3>No such room could be found...</h3>
                        <Link to="/rooms" className="btn btn-warning mt-4 ">Back to Rooms</Link>
                    </div>
                </div>
            </div>
        </div>);
        }
        const {name,capacity,size,price,breakfast,pets,images} = room;
        const [mainImg, ...defaultBcg] = images;
        return (
        <div className="container my-5">
            <div className="row">
                <div >
                    <div>
                        <h1 style={{textAlign:"center"}}>Booking</h1>
                    </div>
                    <div  style={{display:"flex"}} >
                        <div style={{width:"70rem", overflow:"hidden" , marginRight:"5em"}}>
                            <img src={mainImg || defaultBcg} className="img-fluid" alt="selected room" />
                        </div>
                        <div className="col-md-6 col-12 my-auto">
                            <h2  style={{marginLeft:"30px"}}>Rooms Details</h2>
                            
                                        <p style={{marginLeft:"50px", marginBottom:"1em"}}><b>Room Type </b> : {name}</p>
                                     
                                        <p style={{marginLeft:"50px", marginBottom:"1em"}}> <b>Capacity</b> : {capacity}</p>
                                     
                                        <p style={{marginLeft:"50px", marginBottom:"1em"}}> <b>Size </b>: {size}</p>
                                     
                                        <p style={{marginLeft:"50px", marginBottom:"1em"}}> <b>Breakfast </b> : {breakfast === true ? `Included`: `Not Included`}</p>
                                       
                                        <p style={{marginLeft:"50px", marginBottom:"1em"}}> <b>Pets </b>: {pets ===true ? `Allowed` : `Not Allowed`}</p>
                                       

                                        <div  style={{display:"flex"   }}>
                        <div  >
                            <div style={{margin:"2em"}} >
                                <label htmlFor="Fromdate" className="font-weight-bolder mr-3">From Date </label>
                                <DatePicker selected={this.state.startDate} onChange={this.handleChangeStart}  />
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div style={{margin:"2em"}}>
                                <label htmlFor="Todate" className="font-weight-bolder mr-3">To Date </label>
                                <DatePicker style={{width:"5em"}} selected={this.state.endDate} onChange={this.handleChangeEnd}  />
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div style={{border:"1px solid gray", width:"22em" , marginLeft:"5em" , padding:"2em"}}>
                        <div className="col-md-6 col-12">
                            <h6 className="font-weight-bolder">Number of days : {daysLeft}</h6>
                           
                        </div>
                        <div className="col-md-6 col-12">
                            <h6 className="font-weight-bold">Price per day : <span className="badge badge-info">Rs {price}</span></h6>
                            <h6 className="font-weight-bold">Total Price to be paid : <span className="text-primary">Rs {daysLeft*price}</span></h6>
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col-md-6 col-12">
                            <div style={{ marginLeft:"5em" , padding:"2em"}}>
                                <label htmlFor="payment" className="font-weight-bolder">Payment Options </label>
                                <select >
                                    <option disabled>Select payment option</option>
                                    <option value="Credit">Credit Card</option>
                                    <option value="Debit">Debit Card</option>
                                    <option value="checkin">Pay during Checkin</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 col-12 my-auto">
                            <div className="col-md-6 col-12 float-right">
                                <button style={{borderStyle:"none",borderRadius:"10px",width:"10em",
                                height:"4em",cursor:"pointer",color:"white", marginLeft:"10em", 
                                background:"gray", fontSize:"15px"}} data-toggle="modal"
                                 data-target="#thanks">Confirm Book</button>
                            </div>
                        </div>
                    </div>


                        </div>



                        
                    </div>
                   



                </div>
            </div>




          
        </div>
        )
    }
}
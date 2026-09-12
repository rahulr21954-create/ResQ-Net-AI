import { useEffect, useState } from "react";
import socket from "../../socket";

function HospitalDashboard() {

    const [alerts,setAlerts]=useState([]);

    useEffect(()=>{

        socket.on("newEmergency",(data)=>{

            setAlerts(prev=>[data,...prev]);

        });

        return ()=>{
            socket.off("newEmergency");
        }

    },[]);

    useEffect(() => {

    socket.on("userLocation",(location)=>{

        console.log(location);

    });

    return ()=>{

        socket.off("userLocation");

    }

},[]);

    return(

        <div>

            <h1>Live SOS Alerts</h1>

            {alerts.map(alert=>(

                <div key={alert._id}>
                    <h3>{alert.emergencyType}</h3>
                    <p>{alert.address}</p>
                </div>

            ))}

        </div>

    )
}

export default HospitalDashboard;
import React from "react";

interface TimeSlot {
    [key: string]: string;
}


const TimeSlotsCard: React.FC<{timeSlots: TimeSlot}> = ({timeSlots}) => { 

    return (
            <div className="w-max relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded border border-gray-300">
                <table className="w-max text-sm text-left rtl:text-right text-body">
                    <thead className="text-sm text-body bg-neutral-secondary-soft rounded-base">
                        <tr>
                            <th className="px-6 py-2 font-bold border-b border-b-gray-300">{Object.keys(timeSlots) && Object.keys(timeSlots)[0]}</th>
                        </tr>
                    </thead>
                    <tbody>                            
                        {
                            Object.values(timeSlots) && Object.values(timeSlots)[0].split(",").map((t, i) => (
                                t? <tr className="bg-neutral-primary border-b border-b-gray-300" key={i}><td className="px-6 py-2">{t}</td></tr>: ""
                            ))
                        }
                    </tbody>
                </table>                
            </div>
           );
};

export default TimeSlotsCard;

export type propsMessage = {
    content: string, 
    username: string, 
    date: Date, 
    belong: boolean,
}
export const Message = (props: propsMessage) => {
    const formatDate = props.date?props.date.toLocaleString("ru-RU", {
        day:"numeric", 
        month:"numeric", 
        year:"numeric"
    }).slice(11,16):""
    return (
        <div className={`flex ${props.belong ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-md mx-2 my-1 p-3 rounded-lg ${props.belong ? "bg-[#150082]  rounded-tl-none" : "bg-white rounded-tr-none"} shadow-sm`}>
                <div className="flex justify-between items-center">
                    <p className={`text-sm font-medium ${props.belong?"text-gray-300":" text-gray-800"}`}>{props.username}</p>
                    <p className={`text-[11px] ${props.belong?"text-gray-300":" text-gray-400"} mx-2`}>{formatDate}</p>
                </div>
                <p className={`text-sm ${props.belong?"text-white":" text-gray-600"} mt-1`}>{props.content}</p>
            </div>
        </div>
    )
}
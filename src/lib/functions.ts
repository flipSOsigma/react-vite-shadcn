export const ShortedText = (text: string) => {
  return text.length > 50 ? text.substring(0, 50) + "..." : text
}


export const parseDateTime = (datetime?: string) => {
  
  const date = datetime ? new Date(datetime) : new Date()
  const year = date.getFullYear()
  const month = date.toLocaleString('default', { month: 'long' })
  const day = date.getDate()
  const hour = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return { 
    date: `${day} ${month} ${year}`,
    time: `${hour}:${minutes}:${seconds}` 
  }
}

export function convertUTCToIndonesianTime(utcDateString: string) {  
  const utcDate: Date = new Date(utcDateString);  
  const timeZones = { WIB: 7 }
  const formatDate = (date: Date): string => {  
      const pad = (num: number): string => (num < 10 ? '0' + num : num.toString());  
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;  
  };  
  const convertedTimes: { [key: string]: string } = {};  
  for (const [zone, offset] of Object.entries(timeZones)) {  
      const localDate: Date = new Date(utcDate.getTime() + offset * 60 * 60 * 1000);  
      convertedTimes[zone] = formatDate(localDate);  
  }  
  
  return convertedTimes;  
}  

const utcDateString: string = "2025-01-04T14:10:22.928Z";  
const result: { [key: string]: string } = convertUTCToIndonesianTime(utcDateString);  
console.log(result);
export const capitalizeText = (text) => {
  if (!text) return "";
  return text.toUpperCase();
};

export const firstlettercapitalize=(text)=>{
  if(!text)return "";
  return text.charAt(0).toUpperCase()+text.slice(1)
}
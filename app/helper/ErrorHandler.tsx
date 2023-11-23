import { Toast } from "primereact/toast";

const HandleError = (error:any, toast:any) => {
    const errors:string[] = Object.values(error.response.data.errors);
    if(errors.length > 0){
        let _error = errors.map((e)=>{
            return e + "\n"
        })
        toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: _error||"",
            life: 3000
        })
    }
}

export default HandleError
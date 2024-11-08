import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  // State to track password visibility, set to false by default
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async() => {
    let req = await fetch("https://fullstackproject-passman-backend.onrender.com")
    let passwords = await req.json()
    setPasswordArray(passwords)
    console.log(passwords)
  }
  
  useEffect(() => {
    getPasswords()
  }, []);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const savePassword = async() => {
    if(form.site==="" && form.username==="" & form.password===""){
      toast.error('All fields empty', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    else{
      await fetch("https://fullstackproject-passman-backend.onrender.com",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:form.id})})
      setPasswordArray([...passwordArray, {...form, id: uuidv4()}]);
      await fetch("https://fullstackproject-passman-backend.onrender.com",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form, id: uuidv4()})})
      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
      // console.log([...passwordArray, form]);
      setForm({ site: "", username: "", password: "" })
      toast.success('Password Saved', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const deletePassword = async(id) => {
    console.log("Deleting password with id",id)
    let c = confirm("Do you really want to delete the pasword")
    if(c){
      toast.info('Password Deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      setPasswordArray(passwordArray.filter(item=>item.id!==id))
      let res = await fetch("https://fullstackproject-passman-backend.onrender.com",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})})
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id",id)
    setForm({...passwordArray.filter(i=>i.id===id)[0],id:id})
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
    toast('Editing Password', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast.success('Copied to Clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    navigator.clipboard.writeText(text)
  };
  

  return (
    <>
    <div className="absolute inset-0 min-h-screen w-full overflow-auto px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000000_40%,#3a8_100%)]">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="mx-auto max-w-4xl text-white">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-300">&lt;</span>
          Pass
          <span className="text-green-300">Man/&gt;</span>
        </h1>
        <p className="text-center text-lg text-green-500">Your Own Password Manager</p>
        <div className="flex flex-col text-black p-4 items-center">
          <input
            className="rounded-full shadow-[0px_0px_5px_3px_cyan] w-full p-2"
            type="text"
            placeholder="Site URL"
            value={form.site}
            onChange={handleChange}
            name="site"
          />
          <div className="flex w-full gap-4 mt-4 mb-4">
            <input
              className="rounded-full shadow-[0px_0px_5px_3px_cyan] w-full p-2"
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              name="username"
            />
            <div className="relative">
              <input
                className="rounded-full shadow-[0px_0px_5px_3px_cyan] w-full p-2"
                type={isPasswordVisible ? "text" : "password"} // Toggle between text and password
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                name="password"
              />
              <span
                className="text-white absolute right-[0px] top-[10px] cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/dicvhxpz.json"
                  trigger="hover"
                  stroke="bold"
                  style={{"height":"20px"}}
                  state={isPasswordVisible ? "hover-cross" : "hover"
                  } // Change icon state based on visibility
                ></lord-icon>
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="text-black flex justify-center items-center gap-2 bg-green-500 rounded-full px-10 py-1 w-fit hover:bg-green-400 hover:shadow-[0px_0px_5px_3px_green]"
          >
            <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
            Add Password
          </button>
        </div>
        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length==0 && <div>No Passwords to Show</div>}
          {passwordArray.length!=0 && <table className="table-auto w-full rounded-md overflow-hidden shadow-[0px_0px_3px_1px_white] bg-[#3542bd3d] ">
            <thead className=''>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-white max-h-4 overflow-y-auto'>
              {passwordArray.map((item,index)=>{
                return <tr key={index}>
                <td className='py-2 text-center'>
                  <div className='flex items-center justify-center'>
                    <a href={item.site} target="_blank">{item.site}</a>
                    <div className='invert size-7 cursor-pointer lordiconcopy' onClick={()=>{copyText(item.site)}}>
                      <lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        style={{"width":"25px","height":"25px","paddingTop":"3px","paddingLeft":"3px"}}>
                      </lord-icon>
                    </div>
                  </div>
                </td>
                <td className='py-2 text-center'>
                  <div className='flex items-center justify-center'>
                    <span>{item.username}</span>
                    <div className='invert size-7 cursor-pointer lordiconcopy' onClick={()=>{copyText(item.username)}}>
                      <lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        style={{"width":"25px","height":"25px","paddingTop":"3px","paddingLeft":"3px"}}>
                      </lord-icon>
                    </div>
                  </div>
                </td>
                <td className='py-2 text-center'>
                <div className='flex items-center justify-center'>
                    <span></span>
                    <div className='invert size-7 cursor-pointer lordiconcopy' onClick={()=>{copyText(item.password)}}>
                      <lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        style={{"width":"25px","height":"25px","paddingTop":"3px","paddingLeft":"3px"}}>
                      </lord-icon>
                    </div>
                  </div>
                </td>
                <td className="py-2 text-center">
                  <span className="invert mx-1 cursor-pointer" onClick={()=>{editPassword(item.id)}}>
                    <lord-icon
                      src="https://cdn.lordicon.com/gwlusjdu.json"
                      trigger="hover"
                      style={{ width: "25px", height: "25px" }}
                    ></lord-icon>
                  </span>
                  <span className="invert mx-1 cursor-pointer" onClick={()=>{deletePassword(item.id)}}>
                    <lord-icon
                      src="https://cdn.lordicon.com/skkahier.json"
                      trigger="hover"
                      style={{ width: "25px", height: "25px" }}
                    ></lord-icon>
                  </span>
                </td>
              </tr>
              })}
            </tbody>
          </table>}
        </div>
      </div>
    </div>
    </>
  );
};

export default Manager;

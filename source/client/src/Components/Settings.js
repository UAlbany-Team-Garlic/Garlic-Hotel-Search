import React from "react";
import Footer from "./Footer";

function Settings() {
    return (
        <div>
            <div className="container no-padding">
                <div className='row'>
                    <div className='four col'>
                        <div className='col-container' style={{ background: "none" }}>
                            <div className='settingsPic'>
                                <img src={require('../imgs/ph-profile-picDARK.png')}></img>
                            </div>
                            <h1 className='subheader' style={{ textAlign: "center", color: "#fff" }}>user</h1>
                            <label for='file' class='file'>Change Profile Picture</label>
                            <input type='file' id='file'></input>
                        </div>
                    </div>
                    <div className='six col'>
                        <div className='col-container' style={{ background: "none" }}>
                            <h1 className='subheader'>User Settings</h1>
                            <label>Settings 1</label>
                            <input type='text' className='form'></input>
                            <label>Settings 2</label>
                            <input type='text' className='form'></input>
                            <label>Settings 3</label>
                            <input type='text' className='form'></input>
                            <label>Settings 4</label>
                            <input type='text' className='form'></input>
                            <button class="search" id='update'>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}

export default Settings;

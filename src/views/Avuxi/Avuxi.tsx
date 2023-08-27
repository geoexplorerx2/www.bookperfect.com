import axios from 'axios';
import React, { useEffect, useState, FC } from 'react';
import { AVUXI_BASE_URL,SUPPORT_URL } from '../../api/env';
interface AvuxiProps {
  cityname: any;
  taxonomy: any;
};

const Avuxi: FC<AvuxiProps> = ({ cityname, taxonomy }) => {
  const [render, setRender] = useState<any>(1)
  const [html, setHTML] = useState<any>();
  const [updateUI, setUpdateUI] = useState(Math.floor(Math.random() * 100));
  const GetLocation = () => {
    axios.get((SUPPORT_URL + cityname + ',' + taxonomy[1].name).replace(' ', '')).then((response: any) => {
      var sc = document.createElement('script');
      sc.id = 'vxscript';
      sc.type = 'text/javascript';
      sc.async = true;
      sc.src = AVUXI_BASE_URL;
      document.body.appendChild(sc);
      let Documet = `<span class="vxwic" t="639aee9ea904e838e65ed385" ll=${response.data['lat'] + "," + response.data['long']}></span>`;
      setHTML(Documet);
      setUpdateUI(Math.floor(Math.random() * 100));
    });
  }

  useEffect(() => {
    if (render == 5) {
      if (cityname) {
        GetLocation()
      }
    } else {
      setRender(render + 1)
    }
  }, [render,cityname]);

  return (
    <>
      <div key={updateUI}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </>
  )
}

export default Avuxi

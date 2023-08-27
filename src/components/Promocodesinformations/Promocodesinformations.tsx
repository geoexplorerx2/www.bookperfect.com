import React, { FC } from 'react'
import __section_1_ from './__section_1_';
import __section_2_ from './__section_2_';
import __section_3_ from './__section_3_';
import __section_4_ from './__section_4_';

interface PromoCodeInformationsProps {
  data?: any;
};

const PromoCodeInformations: FC<PromoCodeInformationsProps> = ({data}) => {
  // console.log({data});
  return (
    <>
      <__section_1_ data = { data } />
      <__section_2_ data = { data && data.field_offer_how_do_you_get_it } />
      <__section_3_ data = { data } />
      <__section_4_ data = { data } />
    </>
  )
}

export default PromoCodeInformations
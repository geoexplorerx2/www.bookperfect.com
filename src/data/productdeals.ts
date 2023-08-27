import React, { useMemo } from 'react';
import { PopularDealsData } from './ProductDealsData';

export const Productdeals = (dealsType: string, tripType: any) => {
   
    const deals = useMemo(() => {
        return PopularDealsData?.map((deal, index) => {
            return {
               id: deal.id,
               transfers_id: deal.transfers_id ?? null,
               city: deal.city,
               name: deal.city + ' ' + dealsType,
               type: tripType
            }
        } )
    }, []);

    return deals;
};

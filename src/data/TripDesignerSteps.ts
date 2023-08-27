import { FC, ReactNode } from 'react';
import ChooseStay from '../components/ChooseStay/ChooseStay';
import SelectOnMap from '../components/SelectOnTheMap/SelectOnTheMap';
import ArrivalOrder from '../components/TripDesignerSteps/ArrivalOrder';
import ContinueAndFinishStep from '../components/TripDesignerSteps/ContinueAndFinish';
import DragAndDropStep from '../components/TripDesignerSteps/DragDrop';


export interface Step {
    title: string,
    subtitle: string,
    ComponentToRender: FC<{}>
    id: string;
}




const TripDesignerSteps : Step[] = [
    {
       title: 'Please select city from map',
       subtitle: 'Please select on the map. There are 11,312 cities to select',
       ComponentToRender: SelectOnMap,
       id: '1'
    },
    
    {
       title: 'Choose stay nights',
       subtitle: 'Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.',
       ComponentToRender: ChooseStay,
       id: '2'
    },
    {
       title: 'Change order of arrival',
       subtitle: 'Click on a city and drag it to change the destination order in your trip and Remove this hotel',
       ComponentToRender: ArrivalOrder ,
       id: '3'
    },
    {
       title: 'Drag and Drop is active',
       subtitle: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
       ComponentToRender: DragAndDropStep,
       id: '4'
    },
    {
       title: 'Continue and Finish',
       subtitle: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from',
       ComponentToRender: ContinueAndFinishStep,
       id: '5'
    },

]


export default TripDesignerSteps
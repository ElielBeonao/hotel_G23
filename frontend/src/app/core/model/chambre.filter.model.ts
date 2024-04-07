import { Moment } from "moment";

export interface IChambreFilter {
    startDate?: Moment;
    endDate?: Moment;
    capacity?: number;
    area?: string;
    hotelChain?: string;
    hotelCategory?: string;
    numberOfRooms?: number;
    price?: number;
  }

export class ChambreFilter implements IChambreFilter{
    // startDate, endDate, capacity, area, hotelChain, hotelCategory, numberOfRooms, price
    constructor(
        public startDate?: Moment,
        public endDate?: Moment,
        public capacity?: number,
        public area?: string,
        public hotelChain?: string,
        public hotelCategory?: string,
        public numberOfRooms?: number,
        public price?: number
    ) {}
  }
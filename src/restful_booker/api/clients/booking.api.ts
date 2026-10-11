// src/restful_booker/api/clients/booking.api.ts

import { APIRequestContext } from "@playwright/test";
import {
  Booking,
  PartialBooking,
  BookingSearchParams,
} from "../models/booking.model";

export class BookingApi {
  constructor(
    private readonly request: APIRequestContext
  ) {}

  async getBookingIds(params?: BookingSearchParams) {
    return this.request.get("/booking", {
        params: params
        ? Object.fromEntries(
            Object.entries(params).filter(
                ([, value]) => value !== undefined
            )
            )
        : undefined,
    });
    }



  async getBooking(id: number) {
    return this.request.get(`/booking/${id}`, {
      headers: {
        Accept: "application/json",
      },
    });
  }

  async createBooking(booking: Booking) {
    return this.request.post("/booking", {
      data: booking,
      headers: {
        Accept: "application/json",
      },
    });
  }

  async updateBooking(
    id: number,
    booking: Booking,
    token: string
  ) {
    return this.request.put(`/booking/${id}`, {
      data: booking,
      headers: {
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
    });
  }

  async partialUpdateBooking(
    id: number,
    booking: PartialBooking,
    token: string
  ) {
    return this.request.patch(`/booking/${id}`, {
      data: booking,
      headers: {
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
    });
  }

  async deleteBooking(
    id: number,
    token: string
  ) {
    return this.request.delete(`/booking/${id}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }
}

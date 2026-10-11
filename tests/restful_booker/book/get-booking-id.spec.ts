import { test, expect } from "../../../fixtures/restful-booker.fixture";
import { BookingApi } from "../../../src/restful_booker/api/clients/booking.api";


test.describe("Booking - Get Booking ID", () => {
  let bookingApi: BookingApi;

  test.beforeEach(async ({ request }) => {
    bookingApi = new BookingApi(request);
  });

  test("should return booking data for given ID", async () => {
    const response = await bookingApi.getBooking(20);

    expect(response.status()).toBe(200);

    const booking = await response.json();

    expect(booking).toMatchObject({
    firstname: expect.any(String),
    lastname: expect.any(String),
    totalprice: expect.any(Number),
    depositpaid: expect.any(Boolean),
    bookingdates: {
        checkin: expect.any(String),
        checkout: expect.any(String),
    },
    })
    });

});
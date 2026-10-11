import { test, expect } from "../../../fixtures/restful-booker.fixture";
import { BookingApi } from "../../../src/restful_booker/api/clients/booking.api";
import { validBooking } from "../../../src/restful_booker/data/booking.data";

test.describe("Booking - Create Booking", () => {
  let bookingApi: BookingApi;

  test.beforeEach(async ({ request }) => {
    bookingApi = new BookingApi(request);
  });

  test("should create a booking with valid data", async () => {
    const booking = validBooking();

    const response = await bookingApi.createBooking(booking);

    expect(response.status()).toBe(200);

    const createdBooking = await response.json();

    expect(createdBooking).toMatchObject({
      bookingid: expect.any(Number),
      booking: {
        firstname: booking.firstname,
        lastname: booking.lastname,
        totalprice: booking.totalprice,
        depositpaid: booking.depositpaid,
        bookingdates: {
          checkin: booking.bookingdates.checkin,
          checkout: booking.bookingdates.checkout,
        },
        additionalneeds: booking.additionalneeds,
      },
    });
  });
});

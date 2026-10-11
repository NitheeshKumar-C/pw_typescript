import { test, expect } from "../../../fixtures/restful-booker.fixture";
import { BookingApi } from "../../../src/restful_booker/api/clients/booking.api";

test.describe("Booking - Update Booking", () => {
  let bookingApi: BookingApi;

  test.beforeEach(async ({ request }) => {
    bookingApi = new BookingApi(request);
  });

  test("Update booking with valid data", async ({authToken}) => {
    const response = await bookingApi.getBooking(20);

    expect(response.status()).toBe(200);

    const booking = await response.json();

    booking.firstname='spidey';

    const updateRes = await bookingApi.updateBooking(20,booking,authToken);
    const updatedBooking = await updateRes.json();
    expect(updatedBooking.firstname).toBe('spidey');
  });

});
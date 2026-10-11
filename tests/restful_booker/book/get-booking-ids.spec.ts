import { test, expect } from "../../../fixtures/restful-booker.fixture";
import { BookingApi } from "../../../src/restful_booker/api/clients/booking.api";
import { validBooking } from "../../../src/restful_booker/data/booking.data";

test.describe("Booking - Get Booking IDs", () => {
  let bookingApi: BookingApi;

  test.beforeEach(async ({ request }) => {
    bookingApi = new BookingApi(request);
  });

  test("should return all booking IDs", async () => {
    const response = await bookingApi.getBookingIds();

    expect(response.status()).toBe(200);

    const bookings = await response.json();

    expect(Array.isArray(bookings)).toBe(true);

    for (const booking of bookings) {
      expect(booking.bookingid).toEqual(expect.any(Number));
    }
  });

  test("should filter booking IDs by firstname", async () => {
    const booking = validBooking({
      firstname: "SearchFirstname",
    });

    const createResponse =
      await bookingApi.createBooking(booking);

    expect(createResponse.status()).toBe(200);

    const created = await createResponse.json();
    const bookingId = created.bookingid;

    try {
      const response = await bookingApi.getBookingIds({
        firstname: booking.firstname,
      });

      expect(response.status()).toBe(200);

      const bookings = await response.json();

      expect(bookings).toContainEqual({
        bookingid: bookingId,
      });
    } finally {
      // This test is unauthenticated, so cleanup would require auth.
    }
  });

  test("should filter booking IDs by lastname", async () => {
    const booking = validBooking({
      lastname: "SearchLastname",
    });

    const createResponse =
      await bookingApi.createBooking(booking);

    expect(createResponse.status()).toBe(200);

    const created = await createResponse.json();

    const response = await bookingApi.getBookingIds({
      lastname: booking.lastname,
    });

    expect(response.status()).toBe(200);

    const bookings = await response.json();

    expect(bookings).toContainEqual({
      bookingid: created.bookingid,
    });
  });

  test("should filter booking IDs by checkin date", async () => {
    const response = await bookingApi.getBookingIds({
      checkin: "2026-01-01",
    });

    expect(response.status()).toBe(200);

    const bookings = await response.json();

    expect(Array.isArray(bookings)).toBe(true);
  });

  test("should filter booking IDs by checkout date", async () => {
    const response = await bookingApi.getBookingIds({
      checkout: "2026-01-01",
    });

    expect(response.status()).toBe(200);

    const bookings = await response.json();

    expect(Array.isArray(bookings)).toBe(true);
  });

  test("should support multiple search parameters", async () => {
    const response = await bookingApi.getBookingIds({
      firstname: "Jim",
      lastname: "Brown",
    });

    expect(response.status()).toBe(200);

    const bookings = await response.json();

    expect(Array.isArray(bookings)).toBe(true);
  });

  test("should return empty array when no booking matches filters", async () => {
    const response = await bookingApi.getBookingIds({
      firstname: "ThisBookingDefinitelyDoesNotExist",
    });

    expect(response.status()).toBe(200);

    const bookings = await response.json();

    expect(bookings).toEqual([]);
  });
});

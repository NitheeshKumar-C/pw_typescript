import { faker } from "@faker-js/faker";
import { Booking } from "../api/models/booking.model";

export function validBooking(
  overrides: Partial<Booking> = {}
): Booking {
  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 50, max: 1000 }),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: "2026-11-01",
      checkout: "2026-11-05",
    },
    additionalneeds: faker.helpers.arrayElement([
      "Breakfast",
      "Lunch",
      "Dinner",
    ]),
    ...overrides,
  };
}

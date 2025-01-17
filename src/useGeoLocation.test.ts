import { renderHook } from "@testing-library/react";
import { useGeoLocation } from "./useGeoLocation";

describe("useGeoLocation", () => {
  const realGeolocation = navigator.geolocation;
  const geolocationMock = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
    clearWatch: jest.fn()
  };

  beforeEach(() => {
    // @ts-expect-error 'geolocation' is a read-only property
    navigator.geolocation = geolocationMock;
  });

  afterEach(() => {
    // @ts-expect-error 'geolocation' is a read-only property
    navigator.geolocation = realGeolocation;
  });

  it("should return initial coordinates", () => {
    const { result } = renderHook(() => useGeoLocation());

    expect(result.current).toEqual({ lat: 39.4671399, lon: -0.3557275 });
  });

  it("should update coordinates when geolocation is successful", async () => {
    const mockPosition = {
      coords: {
        latitude: 51.1,
        longitude: 45.3
      }
    };

    geolocationMock.getCurrentPosition.mockImplementationOnce(
      (success, error) => {
        Promise.resolve(success(mockPosition));
      }
    );

    const { result } = renderHook(() => useGeoLocation());

    expect(result.current).toEqual({ lat: 51.1, lon: 45.3 });
  });

  it("should log an error when geolocation fails", async () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation();
    geolocationMock.getCurrentPosition.mockImplementationOnce(
      (success, error) =>
        Promise.resolve(error({ code: 1, message: "Geolocation error" }))
    );

    renderHook(() => useGeoLocation());

    expect(console.error).toHaveBeenCalledWith("Error getting user location:", {
      code: 1,
      message: "Geolocation error"
    });
    consoleError.mockRestore();
  });

  it("should log an error when geolocation is not supported", () => {
    const consoleLog = jest.spyOn(console, "log").mockImplementation();
    // @ts-expect-error 'geolocation' it's a read-only property
    navigator.geolocation = undefined;

    renderHook(() => useGeoLocation());

    expect(console.log).toHaveBeenCalledWith(
      "Geolocation is not supported by this browser."
    );
    consoleLog.mockRestore();
  });
});
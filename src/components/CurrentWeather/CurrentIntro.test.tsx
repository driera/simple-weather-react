import { render, screen, waitFor } from "@testing-library/react";
import React, { ReactNode } from "react";
import { CurrentIntro, CurrentIntroType } from "./CurrentIntro";

describe("CurrentIntro", () => {
  it("shows correct location", () => {
    const location = "Barcelona";

    render(currentIntroComponent({ location }));

    waitFor(() => expect(screen.getByText(/barcelona/i)).toBeInTheDocument());
  });

  it("shows correct time", () => {
    const time = new Date(2021, 1, 5, 20, 45);

    render(currentIntroComponent({ time }));

    waitFor(() =>
      expect(screen.getByText(/20:45 – 2\/5\/2021/i)).toBeInTheDocument()
    );
  });

  it("shows conditions", () => {
    const details = {
      temperature: 10,
      temperatureFealing: 12,
      conditions: "Very cold",
      icon: "sun"
    };

    render(currentIntroComponent({ details }));

    waitFor(() => expect(screen.getByText(/10/i)).toBeInTheDocument());
    expect(screen.getByText(/very cold/i)).toBeInTheDocument();
    expect(screen.getByText(/sensación 12º/i)).toBeInTheDocument();
  });

  const currentIntroComponent = ({
    location = "Valencia",
    time = new Date(2021, 0, 1, 6, 0),
    details = {
      temperature: 20,
      temperatureFealing: 18,
      conditions: "nice weather",
      icon: "wind"
    }
  }: Partial<CurrentIntroType>): ReactNode => {
    return <CurrentIntro location={location} time={time} details={details} />;
  };
});

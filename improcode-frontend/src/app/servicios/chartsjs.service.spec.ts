import { TestBed } from "@angular/core/testing";

import { ChartsjsService } from "./chartsjs.service";

describe("ChartsjsService", () => {
  let service: ChartsjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsjsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});

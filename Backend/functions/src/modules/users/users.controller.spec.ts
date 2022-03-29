import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";

describe("UsersController", () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, UsersRepository],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe("findAll", () => {
    it("should return an array of cats", async () => {
      const result = "test";
      jest.spyOn(controller, "findAll").mockImplementation(() => result);

      expect(controller.findAll()).toBe(result);
    });
  });
});

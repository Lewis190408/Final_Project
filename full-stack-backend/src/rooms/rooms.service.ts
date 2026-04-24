import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room)
    private roomModel: typeof Room, // Injecting the Sequelize model
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomModel.create(createRoomDto as any); // Create entry
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.findAll(); // Get all records
  }

  async remove(id: number): Promise<void> {
    const room = await this.roomModel.findByPk(id);
    await room.destroy(); // Delete record
  }
}

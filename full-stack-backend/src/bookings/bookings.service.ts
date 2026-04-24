import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
  ) {}

  create(data: any) {
    return this.bookingsRepository.save({ ...data, status: 'Pending' });
  }

  findAll() {
    return this.bookingsRepository.find();
  }

  async updateStatus(id: number, status: string) {
    return this.bookingsRepository.update(id, { status });
  }
}

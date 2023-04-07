import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create.student.input';
import { Student } from './student.entity';
import { v4 } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async createStudent(createStudent: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = createStudent;
    const student = this.studentRepository.create({
      id: v4(),
      firstName,
      lastName,
    });

    return this.studentRepository.save(student);
  }

  async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async getStudentById(id: string): Promise<Student> {
    return this.studentRepository.findOneBy({ id });
  }

  async getStudentByIds(ids: String[]): Promise<Student[]> {
    const result =await this.studentRepository.find({
      where: {
        'id': {
            '$in': ids,
        } as any,
      },
    });
    return result;
  }
}

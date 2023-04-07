import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import {v4} from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { StudentService } from '../student/student.service';

@Injectable()
export class LessonService {

    constructor(
        @InjectRepository(Lesson)
        private lessonRepository:Repository<Lesson>,
        private studentService: StudentService
    ){}

    async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson>{
        const {name, startDate, endDate, students}= createLessonInput
        const lesson= this.lessonRepository.create({
            id: v4(),
            name,
            startDate,
            endDate,
            students
        })
        return this.lessonRepository.save(lesson)
    }

    async getLesson(id:string){
        return this.lessonRepository.findOneBy({id})
    }

    async getLessons(){
        return this.lessonRepository.find()
    }

    async assignStudentsToLessons(lessonId:string, studentIds:string[]):Promise<Lesson>{
        const lesson= await this.lessonRepository.findOneBy({id:lessonId})
        lesson.students=[...lesson.students, ...studentIds];
        return this.lessonRepository.save(lesson)
    }
}

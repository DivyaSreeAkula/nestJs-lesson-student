import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { LessonResolver } from './lesson/lesson.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson/lesson.entity';
import { LessonService } from './lesson/lesson.service';
import { StudentModule } from './student/student.module';
import { Student } from './student/student.entity';
import { StudentResolver } from './student/student.resolver';
import { StudentService } from './student/student.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:'mongodb://127.0.0.1:27017/school',
      synchronize:true,
      useUnifiedTopology:true,
      entities:[
        Lesson, Student
      ]
    }),
    TypeOrmModule.forFeature([Lesson, Student]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    LessonModule,
    StudentModule,
  ],
  providers: [LessonResolver, LessonService, StudentResolver, StudentService],
})
export class AppModule {}

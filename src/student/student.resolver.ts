import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateStudentInput } from "./create.student.input";
import { StudentService } from "./student.service";
import { StudentType } from "./student.type";

@Resolver(type=> StudentType)
export class StudentResolver {
    constructor(
        private studentService: StudentService
    ){}

    @Mutation(returns=> StudentType)
    createStudent(
        @Args('createStudentInput') createStudentInput: CreateStudentInput
    ){
       return this.studentService.createStudent(createStudentInput)
    }

    @Query(returns=> [StudentType])
    students()
    {
        return this.studentService.getAllStudents()
    }

    
    @Query(returns=> StudentType)
    student(@Args('id') id:string)
    {
        return this.studentService.getStudentById(id)
    }
}
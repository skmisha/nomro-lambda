# nomro-lambda

Plan
0. validate request!
   1. handler would receive object event, consisting of user data
      event: {
          dayOfBirth: number,
          monthOfBirth: number,
          yearOfBirth: number,
          profession: string,
          isMale: true,
          email: string,
      }
2. calculate personal year, month numbers
3. construct system messages with user info
4. send to openai
5. store in db
6. create PDF
7. send email
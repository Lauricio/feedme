Accounts.onCreateUser(function(options, user) {
  console.log('%c user, options   ',  'background: #B3CC57; color: white; padding: 1px 15px 1px 5px;', user);
  user.profile = {};
  user.profile.fullName = options.profile && options.profile.fullName ? options.profile.fullName : 'Guest' 

  if (user.email === 'chef@tapfuse.io') {
    user.chef = true;
    return user;
  }


  user.profile.days = [{
          weekday: 'Monday',
          breakfast: {
            day: '0',
            mealType: 'breakfast',
            time: '10:00',
            fruit: false,
            food: false,
            notEating: false
          },
          lunch: {
            day: '0',
            mealType: 'lunch',
            time: '15:00',
            fruit: false,
            food: false,
            notEating: false
          },
          dinner: {
            day: '0',
            mealType: 'dinner',
            time: '19:00',
            fruit: false,
            food: false,
            notEating: false
          },
        },
        { weekday: 'Tuesday',
          breakfast: {
            day: '1',
            mealType: 'breakfast',
            time: '10:00',
            fruit: false,
            food: false,
            notEating: false
          },
          lunch: {
            day: '1',
            mealType: 'lunch',
            time: '15:00',
            fruit: false,
            food: false,
            notEating: false
          },
          dinner: {
            day: '1',
            mealType: 'dinner',
            time: '19:00',
            fruit: false,
            food: false,
            notEating: false
          }},
          { weekday: 'Wenesday',
            breakfast: {
              day: '2',
              mealType: 'breakfast',
              time: '10:00',
              fruit: false,
              food: false,
              notEating: false
            },
            lunch: {
              day: '2',
              mealType: 'lunch',
              time: '15:00',
              fruit: false,
              food: false,
              notEating: false
            },
            dinner: {
              day: '2',
              mealType: 'dinner',
              time: '19:00',
              fruit: false,
              food: false,
              notEating: false
            }},
            { weekday: 'Thursday',
              breakfast: {
                day: '3',
                mealType: 'breakfast',
                time: '10:00',
                fruit: false,
                food: false,
                notEating: false
              },
              lunch: {
                day: '3',
                mealType: 'lunch',
                time: '15:00',
                fruit: false,
                food: false,
                notEating: false
              },
              dinner: {
                day: '3',
                mealType: 'dinner',
                time: '19:00',
                fruit: false,
                food: false,
                notEating: false
              }},
              { weekday: 'Friday',
                breakfast: {
                  day: '4',
                  mealType: 'breakfast',
                  time: '10:00',
                  fruit: false,
                  food: false,
                  notEating: false
                },
                lunch: {
                  day: '4',
                  mealType: 'lunch',
                  time: '15:00',
                  fruit: false,
                  food: false,
                  notEating: false
                },
                dinner: {
                  day: '4',
                  mealType: 'dinner',
                  time: '19:00',
                  fruit: false,
                  food: false,
                  notEating: false
                }},
                { weekday: 'Saturday',
                  breakfast: {
                    day: '5',
                    mealType: 'breakfast',
                    time: '10:00',
                    fruit: false,
                    food: false,
                    notEating: false
                  },
                  lunch: {
                    day: '5',
                    mealType: 'lunch',
                    time: '15:00',
                    fruit: false,
                    food: false,
                    notEating: false
                  },
                  dinner: {
                    day: '5',
                    mealType: 'dinner',
                    time: '19:00',
                    fruit: false,
                    food: false,
                    notEating: false
                  }},
                  { weekday: 'Sunday',
                    breakfast: {
                      day: '6',
                      mealType: 'breakfast',
                      time: '10:00',
                      fruit: false,
                      food: false,
                      notEating: false
                    },
                    lunch: {
                      day: '6',
                      mealType: 'lunch',
                      time: '15:00',
                      fruit: false,
                      food: false,
                      notEating: false
                    },
                    dinner: {
                      day: '6',
                      mealType: 'dinner',
                      time: '19:00',
                      fruit: false,
                      food: false,
                      notEating: false
                    }}];
  return user;
})
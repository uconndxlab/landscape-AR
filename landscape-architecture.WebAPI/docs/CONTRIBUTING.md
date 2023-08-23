# Contributing

## Git Branching Strategy
- The ```main``` branch is where the stable, deployed version of the API stands.
- To contribute to the ```main``` branch, the main process is to:
    1. Make your own branch using the following naming conventions, topics/{initials}/{Issue #}_{Short Description}. For example, if I was creating a branch where I planned on writing this readme, I would call that branch ```topics/qrm/#5_contributing-readme```
    2. Make your code changes and push the branch
    3. Submit a pull request, you're branch will be available for merge once the Github Workflow is successful, there are no merge conflicts, and at least 1 reviewer has approved.
    4. A valid pull request should include an accurate description of the changes, new test cases for any new/changed functionality, necessary documentation updates, and no added TODOs unless they are referenced in a subsequent work item.
 
## Viewing current issues and work items
- Visit the project board for all info about current development of the project https://github.com/orgs/uconndxlab/projects/14. The board looks something like the following screenshot:

![image](https://github.com/uconndxlab/landscape-AR/assets/32872369/8ae61340-3c53-4692-b1ae-3f0ea1dedd1e)

- We are organizing work into 3 different categories, User Stories, Work Items, and Bugs.
- User Stories are larger pieces of work that usually encapsulate 2 or more work items underneath them. To close out a User Story all the linked tasks (work items) must first be closed and all acceptance criteria must be met. On the project board they are also quantified by a number called story points that indicate the relative workload on the story.
- Work Items are considered singular pieces of work and one or more can usually be completed in a single pull request.
- Bugs are seperate from both User Stories and Work Items, they describe a missmatch between the expected behavior of the app, and the actual behavior.
- Anytime a developer wants to work on a task, they should choose a work item from the ```TODO``` column on the project board.

## Creating new issues.
- Due to Githubs UI for the Project Board, it is recommended to add new tasks from the ```Issues``` tab directly on the repo itself.
- The process for creating a new issue is as follows:

1. Select "New Issue" in the top right corner of the Issues tab on Github

![image](https://github.com/uconndxlab/landscape-AR/assets/32872369/edf5ec2a-2a62-4e54-b40d-ef7c534e6376)

2. Choose a template for the type of issue you want to add, depending on the template there will be specific requirements you have to add to the description of the issue. (NOTE: If you are creating a User Story before creating its associated work items, you need to go back to the description of the User Story and add the associated work items under "Linked Tasks".)
3. Add the necessary info to the issue, such as its title, overview and story points if it is a User Story
4. Add the issue to the project board

![image](https://github.com/uconndxlab/landscape-AR/assets/32872369/0c114618-0df1-4220-bf20-a7c370a84bd4)

5. Press "Submit New Issue" at the bottom once completed.
6. Set the issue to the correct column on the project board using the project dropdown.

![image](https://github.com/uconndxlab/landscape-AR/assets/32872369/d79dad22-7fed-412f-9422-e94729af402a)



"use strict";
/* eslint-disable unicorn/filename-case */
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseParsingTestCases = exports.pathPartTestCases = void 0;
exports.pathPartTestCases = [
    {
        moduleCode: `
            @Get(":uuid")
            class MyClass {}
        `,
        paths: ['":uuid"'],
        message: "gets one on method decorator",
    },
    {
        moduleCode: `
        @Controller("custom-bot/:uuid/my-controller")
        class MyClass {}
        `,
        paths: ['"custom-bot/:uuid/my-controller"'],
        message: "gets one on controller decorator",
    },
    {
        moduleCode: `
        @Controller(["custom-bot/:uuid/my-controller","custom-bot/:uuid/my-controller"])
        class MyClass {}
        `,
        paths: [
            '"custom-bot/:uuid/my-controller"',
            '"custom-bot/:uuid/my-controller"',
        ],
        message: "gets array on controller decorator",
    },
    {
        moduleCode: `
            @Get([":uuid",":uuid"])
            class MyClass {}
        `,
        paths: ['":uuid"', '":uuid"'],
        message: "gets array of method decorator",
    },
    {
        moduleCode: `
            @Get([])
            class MyClass {}
        `,
        paths: [],
        message: "handles empty array",
    },
    {
        moduleCode: `
        @Controller({path: "custom-bot/:uuid/my-controller", someOtherProp: "sdfsdf" })
        class MyClass {}
        `,
        paths: ['"custom-bot/:uuid/my-controller"'],
        message: "handles controller options",
    },
];
exports.responseParsingTestCases = [
    {
        pathToCheck: `uuid`,
        paths: ['":uuid"'],
        shouldResult: true,
    },
    {
        pathToCheck: `uui`,
        paths: ['":uuid"'],
        shouldResult: false,
    },
    {
        pathToCheck: `uuid`,
        paths: ['"/lots/of/text/:uuid"'],
        shouldResult: true,
    },
    {
        pathToCheck: `uui`,
        paths: ['"/lots/of/text/:uuid/"'],
        shouldResult: false,
    },
    {
        pathToCheck: `uuid`,
        paths: ['"/lots/of/text/:uuid/"'],
        shouldResult: true,
    },
    {
        pathToCheck: `uuid`,
        paths: ['"/lots/of/:uuid/text"'],
        shouldResult: true,
    },
    {
        pathToCheck: `uuid`,
        paths: ['":uuid/lots/of/text"'],
        shouldResult: true,
    },
    {
        pathToCheck: `uuid`,
        paths: ['"/:uuid/lots/of/text"'],
        shouldResult: true,
    },
    {
        pathToCheck: `uui`,
        paths: ['"/lots/of/text/:uuid"'],
        shouldResult: false,
    },
    {
        pathToCheck: `uuid`,
        paths: ['":uuid"', '"notMatch"'],
        shouldResult: true,
    },
    {
        pathToCheck: `uuid`,
        paths: ['"notMatch"'],
        shouldResult: false,
    },
    {
        pathToCheck: `uuid`,
        paths: [],
        shouldResult: false,
    },
    {
        pathToCheck: `uuid`,
        paths: ['""', ""],
        shouldResult: false,
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZS50ZXN0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9wYXJhbURlY29yYXRvck5hbWVNYXRjaGVzUm91dGVQYXJhbS9ydWxlLnRlc3REYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwQ0FBMEM7OztBQUU3QixRQUFBLGlCQUFpQixHQUFHO0lBQzdCO1FBQ0ksVUFBVSxFQUFFOzs7U0FHWDtRQUNELEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUNsQixPQUFPLEVBQUUsOEJBQThCO0tBQzFDO0lBQ0Q7UUFDSSxVQUFVLEVBQUU7OztTQUdYO1FBQ0QsS0FBSyxFQUFFLENBQUMsa0NBQWtDLENBQUM7UUFDM0MsT0FBTyxFQUFFLGtDQUFrQztLQUM5QztJQUNEO1FBQ0ksVUFBVSxFQUFFOzs7U0FHWDtRQUNELEtBQUssRUFBRTtZQUNILGtDQUFrQztZQUNsQyxrQ0FBa0M7U0FDckM7UUFDRCxPQUFPLEVBQUUsb0NBQW9DO0tBQ2hEO0lBQ0Q7UUFDSSxVQUFVLEVBQUU7OztTQUdYO1FBQ0QsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQztRQUM3QixPQUFPLEVBQUUsZ0NBQWdDO0tBQzVDO0lBQ0Q7UUFDSSxVQUFVLEVBQUU7OztTQUdYO1FBQ0QsS0FBSyxFQUFFLEVBQUU7UUFDVCxPQUFPLEVBQUUscUJBQXFCO0tBQ2pDO0lBQ0Q7UUFDSSxVQUFVLEVBQUU7OztTQUdYO1FBQ0QsS0FBSyxFQUFFLENBQUMsa0NBQWtDLENBQUM7UUFDM0MsT0FBTyxFQUFFLDRCQUE0QjtLQUN4QztDQUNKLENBQUM7QUFFVyxRQUFBLHdCQUF3QixHQUFHO0lBQ3BDO1FBQ0ksV0FBVyxFQUFFLE1BQU07UUFDbkIsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQ2xCLFlBQVksRUFBRSxJQUFJO0tBQ3JCO0lBQ0Q7UUFDSSxXQUFXLEVBQUUsS0FBSztRQUNsQixLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDbEIsWUFBWSxFQUFFLEtBQUs7S0FDdEI7SUFDRDtRQUNJLFdBQVcsRUFBRSxNQUFNO1FBQ25CLEtBQUssRUFBRSxDQUFDLHVCQUF1QixDQUFDO1FBQ2hDLFlBQVksRUFBRSxJQUFJO0tBQ3JCO0lBQ0Q7UUFDSSxXQUFXLEVBQUUsS0FBSztRQUNsQixLQUFLLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztRQUNqQyxZQUFZLEVBQUUsS0FBSztLQUN0QjtJQUNEO1FBQ0ksV0FBVyxFQUFFLE1BQU07UUFDbkIsS0FBSyxFQUFFLENBQUMsd0JBQXdCLENBQUM7UUFDakMsWUFBWSxFQUFFLElBQUk7S0FDckI7SUFDRDtRQUNJLFdBQVcsRUFBRSxNQUFNO1FBQ25CLEtBQUssRUFBRSxDQUFDLHVCQUF1QixDQUFDO1FBQ2hDLFlBQVksRUFBRSxJQUFJO0tBQ3JCO0lBQ0Q7UUFDSSxXQUFXLEVBQUUsTUFBTTtRQUNuQixLQUFLLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztRQUMvQixZQUFZLEVBQUUsSUFBSTtLQUNyQjtJQUNEO1FBQ0ksV0FBVyxFQUFFLE1BQU07UUFDbkIsS0FBSyxFQUFFLENBQUMsdUJBQXVCLENBQUM7UUFDaEMsWUFBWSxFQUFFLElBQUk7S0FDckI7SUFDRDtRQUNJLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLEtBQUssRUFBRSxDQUFDLHVCQUF1QixDQUFDO1FBQ2hDLFlBQVksRUFBRSxLQUFLO0tBQ3RCO0lBQ0Q7UUFDSSxXQUFXLEVBQUUsTUFBTTtRQUNuQixLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO1FBQ2hDLFlBQVksRUFBRSxJQUFJO0tBQ3JCO0lBQ0Q7UUFDSSxXQUFXLEVBQUUsTUFBTTtRQUNuQixLQUFLLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDckIsWUFBWSxFQUFFLEtBQUs7S0FDdEI7SUFDRDtRQUNJLFdBQVcsRUFBRSxNQUFNO1FBQ25CLEtBQUssRUFBRSxFQUFFO1FBQ1QsWUFBWSxFQUFFLEtBQUs7S0FDdEI7SUFDRDtRQUNJLFdBQVcsRUFBRSxNQUFNO1FBQ25CLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7UUFDakIsWUFBWSxFQUFFLEtBQUs7S0FDdEI7Q0FDSixDQUFDIn0=
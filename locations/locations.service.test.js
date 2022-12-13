const locationsService = require('./locations.service')
const location = require('./locations.model')

jest.mock('./locations.model')
describe('Locations FindAll',()=>{
    it("should call model find", async()=>{
        location.find({}).limit(10).lean().mockResolvedValue([1,2,3,4])
        expect(await locationsService.findAll({}).toEqual([1,2,3,4]))
        expect(locationModel.find).toHaveBeenCalledTimes(1)
    })
})

describe('Locations FindOne',()=>{
    it("should return a location", async()=>{
        const mockLocation={_id:"007",fimName:'Jiji la crevette'}
        location.findById.mockResolvedValue(mockLocation)
        expect(await locationsService.findOne(id="007")).toEqual(mockLocation)
        expect(location.findById).toHaveBeenCalledTimes(1)
    })
    it("should return a location", async()=>{
        jest.resetAllMocks()
        const mockLocation= null
        location.findById.mockResolvedValue(mockLocation)
        expect(await locationsService.findOne(id="007")).rejects.toThrow()
        expect(location.findById).toHaveBeenCalledTimes(1)
    })
})
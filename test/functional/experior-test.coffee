# Not testing all functionality, but this is a taste how like to test functionality of the app (black box test)
webdriver = require 'selenium-webdriver'
chai = require 'chai'
chai.use require 'chai-as-promised'
expect = chai.expect

before ->
  @timeout 10000
  @driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build()

after ->
  @driver.quit()

describe 'Experior', ->
  beforeEach ->
    @driver.get 'http://127.0.0.1:4000/'

  it 'has stats when page is loaded initially', ->
    sleep 150
    expect(@driver.findElement(id: 'boxes_right_now').getText()).to.eventually.equal '1'
    expect(@driver.findElement(id: 'boxes_created_in_total').getText()).to.eventually.equal '1'
    expect(@driver.findElement(id: 'boxes_created_in_session').getText()).to.eventually.equal '1'
    expect(@driver.findElement(id: 'boxes_deleted_in_session').getText()).to.eventually.equal '0'

  it 'has one box added initially', ->
    sleep 150
    @driver.findElements(webdriver.By.className('box')).then (elements) ->
      expect(elements.length).to.equal(1)

  it 'has one box after adding two and removing two', ->
    sleep 150
    @driver.findElement(id: 'box-1').click()
    @driver.findElement(id: 'box-2').click()
    @driver.findElement(id: 'box-remove-2').click()
    @driver.findElement(id: 'box-remove-1').click()
    @driver.findElements(webdriver.By.className('box')).then (elements) ->
      expect(elements.length).to.equal(1)
    expect(@driver.findElement(id: 'box-3').getText()).to.eventually.equal '[ 3 ]'

    # More FT:s would be here if time permitted it :)

sleep = (ms) ->
  start = new Date().getTime()
  continue while new Date().getTime() - start < ms
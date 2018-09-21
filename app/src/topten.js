applyFilter(newFilter) {
  async function filterData(newFilter) {
    const filterCopy = { ...this.state.activeFilters, ...newFilter }
    const filteredData = await this.filterData(filterCopy);
    const filteredTopTen = await this.getTopTen(filteredData)
    this.setState({ ...this.state, activeFilters: filterCopy, data: filteredTopTen })
  }
}
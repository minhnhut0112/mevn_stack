<template>
  <div>
    <div class="header-top">
      Login
      <i class="fa-regular fa-user"></i>
    </div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <p>logo</p>
        <div>
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link text-body" href="">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-body" aria-current="page" href=""
                >G-SHOCK</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link text-body" href="">BABY-G</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-body" href="">EDIFICE</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-body" href="">PRO TREK</a>
            </li>
          </ul>
        </div>
        <div class="d-flex justify-content-center">
          <div className="search">
            <i class="fa-solid fa-magnifying-glass icon-search"></i>
            <input placeholder="Search..." type="search" />
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style>
.search {
  width: 180px;
  height: 2.5rem;
  border-radius: 20px;
  padding: 0 15px;
  border: 1px solid;
  display: flex;
  align-items: center;
  cursor: pointer;
}

input {
  background-color: transparent;
  border: none;
  height: 50px;
  width: 100px;
  font-size: 1.25rem;
  margin-left: 5px;
}

input:focus {
  outline: none;
}

.icon-search {
  font-size: 25px;
}

.header-top {
  height: 30px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: end;
  padding: 5px;
  padding-right: 10px;
}
</style>

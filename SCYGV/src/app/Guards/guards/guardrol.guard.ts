import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { usuarioService } from 'src/app/services/Usuario/usuario.service';

export const guardAdmin: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean => {
  const service : usuarioService = inject(usuarioService)
  const router : Router = inject(Router);

  if(service.getlocalrol() == "1"){
    return true;
  }
  else{
    router.navigate(["Home"]);
    return false;
  }
};

export const guardRH: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean => {
  const service : usuarioService = inject(usuarioService)
  const router : Router = inject(Router);

  if(service.getlocalrol() == "2"){
    return true;
  }
  else{
    router.navigate(["Home"]);
    return false;
  }
};

export const guardEmpleado: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean => {
  const service : usuarioService = inject(usuarioService)
  const router : Router = inject(Router);

  if(service.getlocalrol() == "3"){
    return true;
  }
  else{
    router.navigate(["Home"]);
    return false;
  }
};
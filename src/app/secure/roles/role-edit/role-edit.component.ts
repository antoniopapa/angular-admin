import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Permission} from '../../../interfaces/permission';
import {PermissionService} from '../../../services/permission.service';
import {RoleService} from '../../../services/role.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Role} from '../../../interfaces/role';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {
  form: FormGroup;
  permissions: Permission[] = [];
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      permissions: this.formBuilder.array([])
    });

    this.permissionService.all().subscribe(
      permissions => {
        this.permissions = permissions;
        this.permissions.forEach(p => {
          this.permissionArray.push(
            this.formBuilder.group({
              value: false,
              id: p.id
            })
          );
        });
      }
    );

    this.id = this.route.snapshot.params.id;

    this.roleService.get(this.id).subscribe(
      (role: Role) => {
        const values = this.permissions.map(
          p => {
            return {
              value: role.permissions.some(r => r.id === p.id),
              id: p.id
            };
          }
        );
        this.form.patchValue({
          name: role.name,
          permissions: values
        });
      }
    );
  }

  get permissionArray(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  submit(): void {
    const formData = this.form.getRawValue();

    const data = {
      name: formData.name,
      permissions: formData.permissions.filter(p => p.value === true).map(p => p.id)
    };

    this.roleService.update(this.id, data)
      .subscribe(() => this.router.navigate(['/roles']));
  }

}
